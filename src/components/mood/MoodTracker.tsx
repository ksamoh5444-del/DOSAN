import { useState } from 'react'
import { Card } from '../common/Card'
import { useMood } from '../../hooks/useMood'
import type { Mood } from '../../types'

const MOODS: { value: Mood; emoji: string; label: string }[] = [
  { value: 1, emoji: '😞', label: 'سيئ جدًا' },
  { value: 2, emoji: '😕', label: 'سيئ' },
  { value: 3, emoji: '😐', label: 'عادي' },
  { value: 4, emoji: '🙂', label: 'جيد' },
  { value: 5, emoji: '😄', label: 'ممتاز' },
]

export function MoodTracker() {
  const { todayEntry, logMood } = useMood()
  const [note, setNote] = useState(todayEntry?.note ?? '')

  return (
    <Card>
      <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">كيف تشعر اليوم؟</p>
      <div className="flex justify-between">
        {MOODS.map((m) => (
          <button
            key={m.value}
            onClick={() => logMood(m.value, note)}
            className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 transition-transform active:scale-95 ${
              todayEntry?.mood === m.value ? 'bg-indigo-500/10' : ''
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span
              className={`text-[10px] font-medium ${
                todayEntry?.mood === m.value ? 'text-indigo-500' : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {todayEntry && (
        <input
          value={note}
          onChange={(e) => {
            setNote(e.target.value)
            logMood(todayEntry.mood, e.target.value)
          }}
          placeholder="أضف ملاحظة سريعة (اختياري)"
          className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      )}
    </Card>
  )
}
