import { CheckSquare, Droplet, Smile, Target, Wallet } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { ProgressBar } from '../components/common/ProgressBar'
import { SectionHeader } from '../components/common/SectionHeader'
import { useTasks } from '../hooks/useTasks'
import { useExpenses } from '../hooks/useExpenses'
import { useGoals } from '../hooks/useGoals'
import { useWater } from '../hooks/useWater'
import { useMood } from '../hooks/useMood'
import type { Page } from '../App'
import type { ThemeMode } from '../hooks/useTheme'
import { currentMonthKey, formatCurrency, isSameMonth } from '../lib/utils'

const MOOD_EMOJI: Record<number, string> = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' }

export function HomePage({
  themeMode,
  onToggleTheme,
  onNavigate,
}: {
  themeMode: ThemeMode
  onToggleTheme: () => void
  onNavigate: (p: Page) => void
}) {
  const { tasks } = useTasks()
  const { expenses, budget } = useExpenses()
  const { goals } = useGoals()
  const { glasses, target: waterTarget } = useWater()
  const { todayEntry } = useMood()

  const doneCount = tasks.filter((t) => t.done).length
  const taskPct = tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100)

  const monthKey = currentMonthKey()
  const spent = expenses.filter((e) => isSameMonth(e.date, monthKey)).reduce((sum, e) => sum + e.amount, 0)
  const budgetPct = budget.monthlyLimit > 0 ? Math.round((spent / budget.monthlyLimit) * 100) : 0

  const goalsComplete = goals.filter((g) => g.current >= g.target).length
  const waterPct = Math.round((glasses / waterTarget) * 100)

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'صباح الخير'
    if (h < 18) return 'طاب يومك'
    return 'مساء الخير'
  })()

  return (
    <>
      <Header title={greeting} subtitle="نظرة سريعة على يومك" themeMode={themeMode} onToggleTheme={onToggleTheme} />
      <PageContainer>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <Card onClick={() => onNavigate('tasks')}>
            <div className="mb-2 flex items-center gap-2 text-indigo-500">
              <CheckSquare size={16} />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">المهام</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {doneCount}/{tasks.length}
            </p>
            <ProgressBar value={taskPct} height="h-1.5" />
          </Card>

          <Card onClick={() => onNavigate('money')}>
            <div className="mb-2 flex items-center gap-2 text-indigo-500">
              <Wallet size={16} />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">الميزانية</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(spent)}</p>
            <ProgressBar value={budgetPct} height="h-1.5" colorClassName={budgetPct > 100 ? 'bg-rose-500' : 'bg-indigo-500'} />
          </Card>

          <Card onClick={() => onNavigate('goals')}>
            <div className="mb-2 flex items-center gap-2 text-indigo-500">
              <Target size={16} />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">الأهداف</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {goalsComplete}/{goals.length}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">مكتمل</p>
          </Card>

          <Card onClick={() => onNavigate('wellness')}>
            <div className="mb-2 flex items-center gap-2 text-sky-500">
              <Droplet size={16} />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">الماء</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {glasses}/{waterTarget}
            </p>
            <ProgressBar value={waterPct} height="h-1.5" colorClassName="bg-sky-500" />
          </Card>
        </div>

        <SectionHeader title="مزاج اليوم" />
        <Card className="mb-5" onClick={() => onNavigate('wellness')}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{todayEntry ? MOOD_EMOJI[todayEntry.mood] : '❔'}</span>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {todayEntry ? 'تم التسجيل اليوم' : 'لم يُسجّل بعد'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {todayEntry?.note || 'اضغط للتسجيل'}
              </p>
            </div>
            <div className="flex items-center gap-2 ms-auto text-slate-300 dark:text-slate-600">
              <Smile size={18} />
            </div>
          </div>
        </Card>

        <SectionHeader title="القادم" />
        <div className="space-y-2">
          {tasks.filter((t) => !t.done).length === 0 && (
            <p className="py-6 text-center text-sm text-slate-400 dark:text-slate-500">
              كل شيء تم — لا توجد مهام معلقة.
            </p>
          )}
          {tasks
            .filter((t) => !t.done)
            .slice(0, 4)
            .map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white p-3 dark:border-white/10 dark:bg-slate-900"
              >
                <span className="size-2 shrink-0 rounded-full bg-indigo-500" />
                <p className="min-w-0 flex-1 truncate text-sm text-slate-700 dark:text-slate-200">{t.title}</p>
              </div>
            ))}
        </div>
      </PageContainer>
    </>
  )
}
