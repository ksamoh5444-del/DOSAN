export function ProgressBar({
  value,
  colorClassName = 'bg-indigo-500',
  trackClassName = 'bg-slate-100 dark:bg-white/10',
  height = 'h-2.5',
}: {
  value: number // 0-100
  colorClassName?: string
  trackClassName?: string
  height?: string
}) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div className={`w-full overflow-hidden rounded-full ${trackClassName} ${height}`}>
      <div
        className={`${height} rounded-full ${colorClassName} transition-[width] duration-500 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
