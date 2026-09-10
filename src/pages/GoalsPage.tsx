import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { SectionHeader } from '../components/common/SectionHeader'
import { Fab } from '../components/common/Fab'
import { GoalCard } from '../components/goals/GoalCard'
import { AddGoalSheet } from '../components/goals/AddGoalSheet'
import { GoalsOverviewChart } from '../components/goals/GoalsOverviewChart'
import { useGoals } from '../hooks/useGoals'
import type { ThemeMode } from '../hooks/useTheme'

export function GoalsPage({ themeMode, onToggleTheme }: { themeMode: ThemeMode; onToggleTheme: () => void }) {
  const { goals, addGoal, bumpGoal, removeGoal } = useGoals()
  const [open, setOpen] = useState(false)

  const completed = goals.filter((g) => g.current >= g.target).length

  return (
    <>
      <Header title="الأهداف" subtitle="ابنِ عادات أفضل" themeMode={themeMode} onToggleTheme={onToggleTheme} />
      <PageContainer withFab>
        {goals.length > 0 && (
          <Card className="mb-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="text-xl font-bold text-slate-900 dark:text-white">{completed}</span>/{goals.length}{' '}
                هدف مكتمل
              </p>
            </div>
            <GoalsOverviewChart goals={goals} />
          </Card>
        )}

        <SectionHeader title="أهدافك" />
        <div className="space-y-3">
          {goals.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-400 dark:text-slate-500">
              لا توجد أهداف بعد. اضغط + للبدء بتتبع هدف.
            </p>
          )}
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onBump={(delta) => bumpGoal(goal.id, delta)}
              onRemove={() => removeGoal(goal.id)}
            />
          ))}
        </div>
      </PageContainer>

      <Fab onClick={() => setOpen(true)} label="إضافة هدف" />
      <AddGoalSheet open={open} onClose={() => setOpen(false)} onAdd={addGoal} />
    </>
  )
}
