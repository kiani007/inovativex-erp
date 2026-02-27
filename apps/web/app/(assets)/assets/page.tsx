"use client";

import { Plus, Monitor, Laptop, Keyboard, Mouse, Headphones, QrCode, Download } from "lucide-react";

const assets = [
  { id: "1", tag: "INX-HW-001", name: "MacBook Pro 16\" M3", category: "laptop", brand: "Apple", assignedTo: "Sarah Chen", status: "assigned", condition: "Good", purchaseDate: "Jan 2023" },
  { id: "2", tag: "INX-HW-002", name: "Dell UltraSharp 27\" U2723QE", category: "monitor", brand: "Dell", assignedTo: "Sarah Chen", status: "assigned", condition: "Good", purchaseDate: "Jan 2023" },
  { id: "3", tag: "INX-HW-003", name: "MacBook Pro 14\" M3", category: "laptop", brand: "Apple", assignedTo: "Ahmed Khan", status: "assigned", condition: "Good", purchaseDate: "Mar 2023" },
  { id: "4", tag: "INX-HW-004", name: "ThinkPad X1 Carbon Gen 11", category: "laptop", brand: "Lenovo", assignedTo: null, status: "available", condition: "New", purchaseDate: "Dec 2025" },
  { id: "5", tag: "INX-HW-005", name: "Magic Keyboard with Touch ID", category: "keyboard", brand: "Apple", assignedTo: "David Kim", status: "assigned", condition: "Good", purchaseDate: "Feb 2024" },
  { id: "6", tag: "INX-HW-006", name: "MacBook Pro 16\" M2", category: "laptop", brand: "Apple", assignedTo: null, status: "maintenance", condition: "Fair", purchaseDate: "Jun 2022" },
  { id: "7", tag: "INX-HW-007", name: "Sony WH-1000XM5", category: "headset", brand: "Sony", assignedTo: "James Wilson", status: "assigned", condition: "Good", purchaseDate: "Jul 2024" },
  { id: "8", tag: "INX-HW-008", name: "Dell P2422H 24\"", category: "monitor", brand: "Dell", assignedTo: null, status: "retired", condition: "Poor", purchaseDate: "Mar 2020" },
];

const statusBadge: Record<string, string> = {
  available: "bg-green-100 text-green-700",
  assigned: "bg-blue-100 text-blue-700",
  maintenance: "bg-yellow-100 text-yellow-700",
  retired: "bg-gray-100 text-gray-700",
};

const categoryIcon: Record<string, React.ReactNode> = {
  laptop: <Laptop className="h-5 w-5" />,
  monitor: <Monitor className="h-5 w-5" />,
  keyboard: <Keyboard className="h-5 w-5" />,
  headset: <Headphones className="h-5 w-5" />,
};

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Asset Inventory</h1>
          <p className="text-[var(--muted-foreground)]">
            Track and manage company hardware and equipment.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors">
            <QrCode className="h-4 w-4" />
            Generate QR
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
            <Plus className="h-4 w-4" />
            Add Asset
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Assets", value: "342", color: "text-blue-600" },
          { label: "Assigned", value: "285", color: "text-green-600" },
          { label: "Available", value: "42", color: "text-emerald-600" },
          { label: "Maintenance", value: "15", color: "text-yellow-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-[var(--card)] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Asset Table */}
      <div className="rounded-xl border bg-[var(--card)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-[var(--muted-foreground)]">
                <th className="px-4 py-3 font-medium">Asset</th>
                <th className="px-4 py-3 font-medium">Tag</th>
                <th className="px-4 py-3 font-medium">Brand</th>
                <th className="px-4 py-3 font-medium">Assigned To</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Condition</th>
                <th className="px-4 py-3 font-medium">Purchased</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b last:border-0 hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)]">
                        {categoryIcon[asset.category] || <Monitor className="h-5 w-5" />}
                      </div>
                      <span className="font-medium">{asset.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--muted-foreground)]">{asset.tag}</td>
                  <td className="px-4 py-3">{asset.brand}</td>
                  <td className="px-4 py-3">{asset.assignedTo || <span className="text-[var(--muted-foreground)]">—</span>}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[asset.status]}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{asset.condition}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{asset.purchaseDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
