import { useState } from 'react'
import { Sheet } from '../common/Sheet'

const COLORS = [
  { name: 'Indigo', class: 'bg-indigo-500' },
  { name: 'Emerald', class: 'bg-emerald-500' },
  { name: 'Amber', class: 'bg-amber-500' },
  { name: 'Rose', class: 'bg-rose-500' },
  { name: 'Sky', class: 'bg-sky-500' },
]

export function AddGoalSheet({
  open,
  onClose,
  onAdd,
}: {
  open: boolean
  onClose: () => void
  onAdd: (title: string, target: number, unit: string, color: string) => void
}) {
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')
  const [unit, setUnit] = useState('')
  const [color, setColor] = useState(COLORS[0].class)

  const submit = () => {
    const targetNum = parseFloat(target)
    if (!title.trim() || !targetNum || targetNum <= 0) return
    onAdd(title.trim(), targetNum, unit.trim() || 'times', color)
    setTitle('')
    setTarget('')
    setUnit('')
    setColor(COLORS[0].class)
    onClose()
  }

  return (
    <Sheet open={open} onClose={onClose} title="New Goal">
      <div className="space-y-4">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Read books, Run miles"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />

        <div className="flex gap-3">
          <div className="flex-1">
            <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Target</p>
            <input
              inputMode="decimal"
              value={target}
              onChange={(e) => setTarget(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="12"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>
          <div className="flex-1">
            <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Unit</p>
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="books"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Color</p>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c.class}
                onClick={() => setColor(c.class)}
                aria-label={c.name}
                className={`size-8 rounded-full ${c.class} ${color === c.class ? 'ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-900' : ''}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={submit}
          disabled={!title.trim() || !target}
          className="w-full rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          Add Goal
        </button>
      </div>
    </Sheet>
  )
}
