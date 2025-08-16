export interface Column<T> {
  key: keyof T;
  label: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  caption?: string;
  className?: string;
}

export default function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  striped,
  bordered,
  hoverable,
  caption,
  className,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table
        className={`min-w-full text-sm text-left border-collapse bg-white dark:bg-gray-900 ${
          bordered ? "border border-gray-300 dark:border-gray-700" : ""
        } ${className || ""}`}
      >
        {/* Caption */}
        {caption && (
          <caption className="caption-top text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
            {caption}
          </caption>
        )}

        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-6 py-3 text-sm font-semibold tracking-wide ${
                  bordered ? "border border-gray-300 dark:border-gray-700" : ""
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`
                ${striped && i % 2 === 1 ? "bg-gray-50 dark:bg-gray-900" : ""}
                ${
                  hoverable
                    ? "hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                    : ""
                }
              `}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={`px-6 py-3 text-gray-700 dark:text-gray-300 ${
                    bordered ? "border border-gray-300 dark:border-gray-700" : ""
                  }`}
                >
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}

          {/* Empty State */}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
