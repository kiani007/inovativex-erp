const financeData = {
  revenue: "$284,500",
  expenses: "$156,200",
  profit: "$128,300",
  outstandingInvoices: 7,
  overdueAmount: "$42,800",
};

export function FinanceSummary() {
  return (
    <div className="rounded-xl border bg-[var(--card)] p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Finance</h3>
        <span className="text-xs text-[var(--muted-foreground)]">
          This month
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--muted-foreground)]">Revenue</span>
          <span className="text-sm font-semibold text-green-600">
            {financeData.revenue}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--muted-foreground)]">Expenses</span>
          <span className="text-sm font-semibold text-red-600">
            {financeData.expenses}
          </span>
        </div>
        <div className="border-t pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Net Profit</span>
            <span className="text-sm font-bold text-green-600">
              {financeData.profit}
            </span>
          </div>
        </div>
      </div>

      {financeData.outstandingInvoices > 0 && (
        <div className="mt-4 rounded-lg bg-yellow-50 p-3">
          <p className="text-xs font-medium text-yellow-800">
            {financeData.outstandingInvoices} outstanding invoices
          </p>
          <p className="text-xs text-yellow-600">
            {financeData.overdueAmount} overdue
          </p>
        </div>
      )}
    </div>
  );
}
