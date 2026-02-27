import type { Middleware, SlackCommandMiddlewareArgs } from "@slack/bolt";

/**
 * Authentication middleware that maps Slack users to ERP users
 * via their Slack user ID stored in the profiles table.
 */
export const authMiddleware: Middleware<SlackCommandMiddlewareArgs> = async ({
  next,
  context,
  command,
}) => {
  // In production, look up the ERP user profile by Slack user ID
  // const supabase = createClient();
  // const { data: profile } = await supabase
  //   .from('profiles')
  //   .select('*')
  //   .eq('slack_user_id', command.user_id)
  //   .single();

  // For now, pass through
  context.erpUserId = null;
  context.erpUserRole = "employee";

  await next();
};
