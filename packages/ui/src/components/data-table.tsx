interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border bg-[var(--card)] p-12 text-center">
        <p className="text-[var(--muted-foreground)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-[var(--card)]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-[var(--muted-foreground)]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 font-medium ${col.className ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(item)}
                className={`border-b last:border-0 transition-colors hover:bg-[var(--muted)] ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 ${col.className ?? ""}`}
                  >
                    {col.render
                      ? col.render(item)
                      : (item[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
