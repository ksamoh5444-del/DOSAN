import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Goal } from '../../types'

const HEX_BY_CLASS: Record<string, string> = {
  'bg-indigo-500': '#6366f1',
  'bg-emerald-500': '#10b981',
  'bg-amber-500': '#f59e0b',
  'bg-rose-500': '#f43f5e',
  'bg-sky-500': '#0ea5e9',
}

export function GoalsOverviewChart({ goals }: { goals: Goal[] }) {
  const data = goals.map((g) => ({
    name: g.title.length > 10 ? `${g.title.slice(0, 9)}…` : g.title,
    pct: g.target > 0 ? Math.round((g.current / g.target) * 100) : 0,
    color: HEX_BY_CLASS[g.color] ?? '#6366f1',
  }))

  if (data.length === 0) return null

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <YAxis hide domain={[0, 100]} />
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }}
          />
          <Bar dataKey="pct" radius={[6, 6, 0, 0]} maxBarSize={28}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
