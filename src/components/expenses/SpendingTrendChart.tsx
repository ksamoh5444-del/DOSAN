import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import type { Expense } from '../../types'
import { formatCurrency, lastNDays, weekdayLabel } from '../../lib/utils'

export function SpendingTrendChart({ expenses }: { expenses: Expense[] }) {
  const days = lastNDays(7)
  const totalsByDay = new Map<string, number>()
  for (const e of expenses) {
    totalsByDay.set(e.date, (totalsByDay.get(e.date) ?? 0) + e.amount)
  }
  const data = days.map((date) => ({
    date,
    label: weekdayLabel(date),
    total: totalsByDay.get(date) ?? 0,
  }))

  return (
    <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            interval={0}
          />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.label}
            contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }}
          />
          <Area type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} fill="url(#spendGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
