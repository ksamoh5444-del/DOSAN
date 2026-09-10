import { Check, Trash2 } from 'lucide-react'
import type { Task } from '../../types'

const PRIORITY_STYLES: Record<Task['priority'], string> = {
  high: 'bg-rose-500/10 text-rose-500',
  medium: 'bg-amber-500/10 text-amber-500',
  low: 'bg-emerald-500/10 text-emerald-500',
}

export function TaskItem({
  task,
  onToggle,
  onRemove,
}: {
  task: Task
  onToggle: () => void
  onRemove: () => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white p-3 dark:border-white/10 dark:bg-slate-900">
      <button
        onClick={onToggle}
        aria-label={task.done ? 'Mark as pending' : 'Mark as done'}
        className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          task.done
            ? 'border-indigo-500 bg-indigo-500 text-white'
            : 'border-slate-300 text-transparent dark:border-slate-600'
        }`}
      >
        <Check size={14} strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${
            task.done ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-900 dark:text-white'
          }`}
        >
          {task.title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${PRIORITY_STYLES[task.priority]}`}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Due {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={onRemove}
        aria-label="Delete task"
        className="shrink-0 rounded-lg p-2 text-slate-300 active:bg-rose-50 active:text-rose-500 dark:text-slate-600 dark:active:bg-rose-500/10"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
