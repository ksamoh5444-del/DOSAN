import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { Expense } from '../../types'
import { formatCurrency } from '../../lib/utils'

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#0ea5e9', '#64748b']

export function ExpenseCategoryChart({ expenses }: { expenses: Expense[] }) {
  const byCategory = new Map<string, number>()
  for (const e of expenses) {
    byCategory.set(e.category, (byCategory.get(e.category) ?? 0) + e.amount)
  }
  const data = Array.from(byCategory.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  if (data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-slate-400 dark:text-slate-500">
        No expenses this month yet
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="h-40 w-40 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={42} outerRadius={68} paddingAngle={2}>
              {data.map((entry, i) => (
                <Cell key={entry.name} fill={COLORS[i % COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        {data.slice(0, 6).map((d, i) => (
          <div key={d.name} className="flex items-center justify-between gap-2 text-xs">
            <span className="flex min-w-0 items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="size-2 shrink-0 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
              <span className="truncate">{d.name}</span>
            </span>
            <span className="shrink-0 font-medium text-slate-900 dark:text-white">{formatCurrency(d.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
