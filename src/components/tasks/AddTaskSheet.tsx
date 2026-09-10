import { useState } from 'react'
import { Sheet } from '../common/Sheet'
import type { Priority } from '../../types'

const PRIORITIES: Priority[] = ['low', 'medium', 'high']

export function AddTaskSheet({
  open,
  onClose,
  onAdd,
}: {
  open: boolean
  onClose: () => void
  onAdd: (title: string, priority: Priority, dueDate?: string) => void
}) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')

  const submit = () => {
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed, priority, dueDate || undefined)
    setTitle('')
    setPriority('medium')
    setDueDate('')
    onClose()
  }

  return (
    <Sheet open={open} onClose={onClose} title="New Task">
      <div className="space-y-4">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />

        <div>
          <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Priority</p>
          <div className="flex gap-2">
            {PRIORITIES.map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex-1 rounded-xl py-2 text-sm font-medium capitalize transition-colors ${
                  priority === p
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Due date (optional)</p>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>

        <button
          onClick={submit}
          disabled={!title.trim()}
          className="w-full rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          Add Task
        </button>
      </div>
    </Sheet>
  )
}
