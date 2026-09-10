import { useMemo, useState } from 'react'
import { Header } from '../components/layout/Header'
import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { ProgressBar } from '../components/common/ProgressBar'
import { Fab } from '../components/common/Fab'
import { TaskItem } from '../components/tasks/TaskItem'
import { AddTaskSheet } from '../components/tasks/AddTaskSheet'
import { useTasks } from '../hooks/useTasks'
import type { ThemeMode } from '../hooks/useTheme'

type Filter = 'all' | 'pending' | 'done'

const FILTER_LABELS: Record<Filter, string> = { all: 'الكل', pending: 'قيد الانتظار', done: 'مكتملة' }

export function TasksPage({ themeMode, onToggleTheme }: { themeMode: ThemeMode; onToggleTheme: () => void }) {
  const { tasks, addTask, toggleTask, removeTask, clearCompleted } = useTasks()
  const [filter, setFilter] = useState<Filter>('all')
  const [sheetOpen, setSheetOpen] = useState(false)

  const doneCount = tasks.filter((t) => t.done).length
  const total = tasks.length
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100)

  const filtered = useMemo(() => {
    if (filter === 'pending') return tasks.filter((t) => !t.done)
    if (filter === 'done') return tasks.filter((t) => t.done)
    return tasks
  }, [tasks, filter])

  return (
    <>
      <Header title="المهام" subtitle="خطط يومك" themeMode={themeMode} onToggleTheme={onToggleTheme} />
      <PageContainer withFab>
        <Card className="mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {doneCount}/{total}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">مهام مكتملة اليوم</p>
            </div>
            <p className="text-2xl font-bold text-indigo-500">{pct}%</p>
          </div>
          <div className="mt-3">
            <ProgressBar value={pct} />
          </div>
        </Card>

        <div className="mb-4 flex gap-2">
          {(['all', 'pending', 'done'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300'
              }`}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
          {doneCount > 0 && (
            <button
              onClick={clearCompleted}
              className="ms-auto text-xs font-medium text-slate-400 underline-offset-2 active:underline"
            >
              مسح المكتملة
            </button>
          )}
        </div>

        <div className="space-y-2">
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-400 dark:text-slate-500">
              {tasks.length === 0 ? 'لا توجد مهام بعد. اضغط + لإضافة واحدة.' : 'لا يوجد شيء هنا.'}
            </p>
          )}
          {filtered.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={() => toggleTask(task.id)} onRemove={() => removeTask(task.id)} />
          ))}
        </div>
      </PageContainer>

      <Fab onClick={() => setSheetOpen(true)} label="إضافة مهمة" />
      <AddTaskSheet open={sheetOpen} onClose={() => setSheetOpen(false)} onAdd={addTask} />
    </>
  )
}
