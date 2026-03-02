import { createAdminClient, createServerSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

async function verifyAdmin(supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  const profile = data as { role: string } | null;
  if (!profile || profile.role !== "admin") return null;

  return user;
}

export async function GET() {
  const supabase = await createServerSupabaseClient();

  const user = await verifyAdmin(supabase);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch all profiles with department info
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*, departments(name)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ users: profiles });
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  const user = await verifyAdmin(supabase);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { email, full_name, password, role, department_id } = body;

  if (!email || !full_name || !password) {
    return NextResponse.json(
      { error: "Email, full name, and password are required" },
      { status: 400 }
    );
  }

  // Use admin client (service role) to create auth user
  const adminClient = createAdminClient();

  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm since admin is creating the account
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  // Create profile record linked to the auth user
  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .insert({
      auth_user_id: authData.user.id,
      email,
      full_name,
      role: role || "employee",
      department_id: department_id || null,
      is_active: true,
    })
    .select()
    .single();

  if (profileError) {
    // Rollback: delete the auth user if profile creation fails
    await adminClient.auth.admin.deleteUser(authData.user.id);
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ user: profile }, { status: 201 });
}
