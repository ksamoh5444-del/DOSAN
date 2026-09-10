import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { MoodEntry } from '../../types'
import { lastNDays, weekdayLabel } from '../../lib/utils'

const EMOJI: Record<number, string> = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' }

export function MoodTrendChart({ entries }: { entries: MoodEntry[] }) {
  const days = lastNDays(7)
  const byDate = new Map(entries.map((e) => [e.date, e.mood]))
  const data = days.map((date) => ({
    date,
    label: weekdayLabel(date),
    mood: byDate.get(date) ?? null,
  }))

  const hasData = data.some((d) => d.mood !== null)
  if (!hasData) {
    return (
      <div className="flex h-28 items-center justify-center text-sm text-slate-400 dark:text-slate-500">
        Log your mood to see trends
      </div>
    )
  }

  return (
    <div className="h-28 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <YAxis hide domain={[1, 5]} />
          <Tooltip
            formatter={(value) => (value ? EMOJI[Number(value)] : '—')}
            contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#a855f7"
            strokeWidth={2}
            dot={{ r: 3, fill: '#a855f7' }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
