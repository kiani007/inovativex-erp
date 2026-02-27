"use client";

import {
  DollarSign,
  Calendar,
  TrendingUp,
  Building2,
  MoreHorizontal,
  Plus,
} from "lucide-react";

interface Deal {
  id: string;
  title: string;
  client: string;
  value: string;
  valueNum: number;
  probability: number;
  expectedClose: string;
}

interface PipelineColumn {
  id: string;
  title: string;
  color: string;
  deals: Deal[];
}

const pipelineColumns: PipelineColumn[] = [
  {
    id: "lead",
    title: "Lead",
    color: "bg-gray-500",
    deals: [
      {
        id: "deal-01",
        title: "Enterprise CRM Implementation",
        client: "GlobalTech Inc.",
        value: "$180,000",
        valueNum: 180000,
        probability: 20,
        expectedClose: "Jun 15, 2026",
      },
      {
        id: "deal-02",
        title: "Cloud Migration Services",
        client: "DataFlow Systems",
        value: "$95,000",
        valueNum: 95000,
        probability: 15,
        expectedClose: "Jul 01, 2026",
      },
      {
        id: "deal-03",
        title: "Custom Analytics Dashboard",
        client: "MarketPro Agency",
        value: "$55,000",
        valueNum: 55000,
        probability: 25,
        expectedClose: "May 20, 2026",
      },
    ],
  },
  {
    id: "proposal",
    title: "Proposal",
    color: "bg-blue-500",
    deals: [
      {
        id: "deal-04",
        title: "Mobile App Development",
        client: "FoodChain Corp.",
        value: "$220,000",
        valueNum: 220000,
        probability: 40,
        expectedClose: "May 10, 2026",
      },
      {
        id: "deal-05",
        title: "Website Redesign",
        client: "LuxuryStay Hotels",
        value: "$75,000",
        valueNum: 75000,
        probability: 50,
        expectedClose: "Apr 25, 2026",
      },
      {
        id: "deal-06",
        title: "IoT Platform Development",
        client: "SmartHome Ltd.",
        value: "$310,000",
        valueNum: 310000,
        probability: 35,
        expectedClose: "Aug 30, 2026",
      },
      {
        id: "deal-07",
        title: "API Integration Suite",
        client: "ConnectAll Inc.",
        value: "$65,000",
        valueNum: 65000,
        probability: 45,
        expectedClose: "Apr 15, 2026",
      },
    ],
  },
  {
    id: "negotiation",
    title: "Negotiation",
    color: "bg-orange-500",
    deals: [
      {
        id: "deal-08",
        title: "ERP System Customization",
        client: "ManufacturePro",
        value: "$450,000",
        valueNum: 450000,
        probability: 70,
        expectedClose: "Apr 01, 2026",
      },
      {
        id: "deal-09",
        title: "Data Warehouse Solution",
        client: "AnalyticsFirst",
        value: "$185,000",
        valueNum: 185000,
        probability: 65,
        expectedClose: "Mar 28, 2026",
      },
      {
        id: "deal-10",
        title: "Security Audit & Compliance",
        client: "FinanceFirst Bank",
        value: "$120,000",
        valueNum: 120000,
        probability: 75,
        expectedClose: "Mar 20, 2026",
      },
    ],
  },
  {
    id: "won",
    title: "Won",
    color: "bg-green-500",
    deals: [
      {
        id: "deal-11",
        title: "E-Commerce Platform Redesign",
        client: "RetailMax Inc.",
        value: "$120,000",
        valueNum: 120000,
        probability: 100,
        expectedClose: "Jan 10, 2026",
      },
      {
        id: "deal-12",
        title: "Mobile Banking App",
        client: "FinanceFirst Bank",
        value: "$250,000",
        valueNum: 250000,
        probability: 100,
        expectedClose: "Feb 01, 2026",
      },
      {
        id: "deal-13",
        title: "Supply Chain Dashboard",
        client: "LogiFlow Ltd.",
        value: "$95,000",
        valueNum: 95000,
        probability: 100,
        expectedClose: "Dec 15, 2025",
      },
      {
        id: "deal-14",
        title: "Inventory Management API",
        client: "WareHouse Pro",
        value: "$65,000",
        valueNum: 65000,
        probability: 100,
        expectedClose: "Jan 20, 2026",
      },
    ],
  },
  {
    id: "lost",
    title: "Lost",
    color: "bg-red-500",
    deals: [
      {
        id: "deal-15",
        title: "Blockchain Integration",
        client: "CryptoVault LLC",
        value: "$340,000",
        valueNum: 340000,
        probability: 0,
        expectedClose: "Feb 10, 2026",
      },
      {
        id: "deal-16",
        title: "AI Chatbot Platform",
        client: "ServiceNow Corp.",
        value: "$160,000",
        valueNum: 160000,
        probability: 0,
        expectedClose: "Jan 30, 2026",
      },
      {
        id: "deal-17",
        title: "Legacy System Migration",
        client: "OldTech Systems",
        value: "$280,000",
        valueNum: 280000,
        probability: 0,
        expectedClose: "Mar 01, 2026",
      },
    ],
  },
];

function formatTotal(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${(value / 1000).toFixed(0)}K`;
}

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Deal Pipeline</h1>
          <p className="text-[var(--muted-foreground)]">
            Track and manage your sales pipeline and opportunities.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
          <Plus className="h-4 w-4" />
          Add Deal
        </button>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryCard
          label="Total Pipeline"
          value={formatTotal(
            pipelineColumns
              .filter((c) => c.id !== "won" && c.id !== "lost")
              .reduce(
                (sum, col) =>
                  sum + col.deals.reduce((s, d) => s + d.valueNum, 0),
                0
              )
          )}
          subtext="Active deals"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <SummaryCard
          label="Weighted Value"
          value={formatTotal(
            pipelineColumns
              .filter((c) => c.id !== "won" && c.id !== "lost")
              .reduce(
                (sum, col) =>
                  sum +
                  col.deals.reduce(
                    (s, d) => s + d.valueNum * (d.probability / 100),
                    0
                  ),
                0
              )
          )}
          subtext="Expected revenue"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <SummaryCard
          label="Won This Quarter"
          value={formatTotal(
            pipelineColumns
              .find((c) => c.id === "won")
              ?.deals.reduce((s, d) => s + d.valueNum, 0) || 0
          )}
          subtext={`${pipelineColumns.find((c) => c.id === "won")?.deals.length || 0} deals closed`}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
        <SummaryCard
          label="Win Rate"
          value="57%"
          subtext="Last 90 days"
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Pipeline Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {pipelineColumns.map((column) => {
          const columnTotal = column.deals.reduce(
            (sum, d) => sum + d.valueNum,
            0
          );
          return (
            <div
              key={column.id}
              className="flex w-72 shrink-0 flex-col rounded-xl border bg-[var(--muted)]/30"
            >
              {/* Column Header */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${column.color}`}
                    />
                    <h3 className="text-sm font-semibold">{column.title}</h3>
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--muted)] px-1.5 text-xs font-medium text-[var(--muted-foreground)]">
                      {column.deals.length}
                    </span>
                  </div>
                  <button className="rounded p-1 text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-xs font-semibold text-[var(--muted-foreground)]">
                  {formatTotal(columnTotal)}
                </p>
              </div>

              {/* Deal Cards */}
              <div className="flex-1 space-y-2 px-3 pb-3">
                {column.deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} columnId={column.id} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  subtext,
  iconBg,
  iconColor,
}: {
  label: string;
  value: string;
  subtext: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-xl border bg-[var(--card)] p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}
        >
          <TrendingUp className={`h-4 w-4 ${iconColor}`} />
        </div>
      </div>
      <p className="mt-1 text-xl font-bold">{value}</p>
      <p className="text-xs text-[var(--muted-foreground)]">{subtext}</p>
    </div>
  );
}

function DealCard({ deal, columnId }: { deal: Deal; columnId: string }) {
  const probabilityColor =
    deal.probability >= 70
      ? "text-green-700 bg-green-100"
      : deal.probability >= 40
      ? "text-yellow-700 bg-yellow-100"
      : deal.probability > 0
      ? "text-red-700 bg-red-100"
      : "text-gray-700 bg-gray-100";

  return (
    <div className="rounded-lg border bg-[var(--card)] p-3 shadow-sm transition-shadow hover:shadow-md cursor-pointer">
      {/* Title */}
      <p className="text-sm font-medium leading-snug">{deal.title}</p>

      {/* Client */}
      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
        <Building2 className="h-3 w-3" />
        {deal.client}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          <DollarSign className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          {deal.value}
        </div>

        {columnId !== "won" && columnId !== "lost" && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${probabilityColor}`}
          >
            {deal.probability}%
          </span>
        )}

        {columnId === "won" && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
            Won
          </span>
        )}

        {columnId === "lost" && (
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700">
            Lost
          </span>
        )}
      </div>

      {/* Expected Close */}
      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--muted-foreground)]">
        <Calendar className="h-3 w-3" />
        {columnId === "won" || columnId === "lost" ? "Closed" : "Expected"}:{" "}
        {deal.expectedClose}
      </div>
    </div>
  );
}
