
type StatusCardProps = {
  title: string
  value: string | number
  trend?: "up" | "down"
  icon?: React.ReactNode
  trendValue?: string
}

export function StatusCard({
  title,
  value,
  trend,
  trendValue,
  icon,
}: StatusCardProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground p-4 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>
                {icon && (
          <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mt-2 text-2xl font-bold">{value}</div>

      {/* Trend */}
      {trend && trendValue && (
        <p
          className={`mt-1 text-xs font-medium ${
            trend === "up"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {trend === "up" ? "▲" : "▼"} {trendValue}
        </p>
      )}
    </div>
  )
}
