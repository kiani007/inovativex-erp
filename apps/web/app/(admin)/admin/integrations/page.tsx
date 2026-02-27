"use client";

import {
  Settings,
  ExternalLink,
  MessageSquare,
  Github,
  DollarSign,
  Mail,
  Cloud,
} from "lucide-react";
import { useState } from "react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  connected: boolean;
  lastSync?: string;
}

const initialIntegrations: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description:
      "Send notifications and updates to Slack channels. Receive alerts for leave requests, project updates, and system events.",
    icon: MessageSquare,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    connected: true,
    lastSync: "2 minutes ago",
  },
  {
    id: "github",
    name: "GitHub",
    description:
      "Sync repositories, track commits, and link pull requests to projects. Automatic time tracking from commit activity.",
    icon: Github,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-800",
    connected: true,
    lastSync: "5 minutes ago",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description:
      "Sync invoices, expenses, and financial data with QuickBooks Online. Automated reconciliation and reporting.",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    connected: false,
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    description:
      "Integrate with Google Calendar, Drive, and Gmail. Single sign-on support and document collaboration.",
    icon: Mail,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    connected: true,
    lastSync: "1 hour ago",
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    description:
      "Connect with Outlook, Teams, and SharePoint. Sync calendar events and enable SSO with Azure AD.",
    icon: Cloud,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    connected: false,
  },
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations);

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              connected: !integration.connected,
              lastSync: !integration.connected ? "Just now" : undefined,
            }
          : integration
      )
    );
  };

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Integrations</h1>
          <p className="text-[var(--muted-foreground)]">
            Connect third-party services and manage data synchronization.
          </p>
        </div>
        <div className="rounded-lg bg-[var(--muted)] px-3 py-1.5 text-sm">
          <span className="font-medium">{connectedCount}</span>
          <span className="text-[var(--muted-foreground)]">
            {" "}
            of {integrations.length} connected
          </span>
        </div>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <div
              key={integration.id}
              className="rounded-xl border bg-[var(--card)] p-6 flex flex-col"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${integration.iconBg}`}
                  >
                    <Icon className={`h-6 w-6 ${integration.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{integration.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          integration.connected
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {integration.connected ? "Connected" : "Disconnected"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-[var(--muted-foreground)] flex-1">
                {integration.description}
              </p>

              {/* Last Sync */}
              {integration.connected && integration.lastSync && (
                <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                  Last synced: {integration.lastSync}
                </p>
              )}

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2 border-t pt-4">
                <button
                  onClick={() => toggleConnection(integration.id)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    integration.connected
                      ? "border hover:bg-[var(--muted)] text-[var(--foreground)]"
                      : "bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)]"
                  }`}
                >
                  {integration.connected ? "Disconnect" : "Connect"}
                </button>
                {integration.connected && (
                  <button
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors"
                    title="Configure"
                  >
                    <Settings className="h-4 w-4" />
                    Configure
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
