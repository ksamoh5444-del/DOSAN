import { Minus, Plus, Trash2 } from 'lucide-react'
import type { Goal } from '../../types'
import { ProgressBar } from '../common/ProgressBar'
import { Card } from '../common/Card'

export function GoalCard({
  goal,
  onBump,
  onRemove,
}: {
  goal: Goal
  onBump: (delta: number) => void
  onRemove: () => void
}) {
  const pct = goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0
  const complete = goal.current >= goal.target

  return (
    <Card>
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{goal.title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {goal.current} / {goal.target} {goal.unit}
          </p>
        </div>
        <button
          onClick={onRemove}
          aria-label="Delete goal"
          className="shrink-0 rounded-lg p-1.5 text-slate-300 active:text-rose-500 dark:text-slate-600"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <ProgressBar value={pct} colorClassName={complete ? 'bg-emerald-500' : goal.color} />

      <div className="mt-3 flex items-center justify-between">
        <span className={`text-sm font-bold ${complete ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
          {complete ? 'Complete 🎉' : `${pct}%`}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onBump(-1)}
            aria-label="Decrease progress"
            className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 active:scale-95 dark:bg-white/10 dark:text-slate-300"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => onBump(1)}
            aria-label="Increase progress"
            className="flex size-8 items-center justify-center rounded-full bg-indigo-500 text-white active:scale-95"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </Card>
  )
}
