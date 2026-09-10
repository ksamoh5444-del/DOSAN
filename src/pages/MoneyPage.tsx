import { useMemo, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { ProgressBar } from '../components/common/ProgressBar'
import { Fab } from '../components/common/Fab'
import { SectionHeader } from '../components/common/SectionHeader'
import { AddExpenseSheet } from '../components/expenses/AddExpenseSheet'
import { BudgetLimitSheet } from '../components/expenses/BudgetLimitSheet'
import { ExpenseCategoryChart } from '../components/expenses/ExpenseCategoryChart'
import { SpendingTrendChart } from '../components/expenses/SpendingTrendChart'
import { useExpenses } from '../hooks/useExpenses'
import type { ThemeMode } from '../hooks/useTheme'
import { currentMonthKey, formatCurrency, formatShortDate, isSameMonth } from '../lib/utils'

export function MoneyPage({ themeMode, onToggleTheme }: { themeMode: ThemeMode; onToggleTheme: () => void }) {
  const { expenses, addExpense, removeExpense, budget, setMonthlyLimit } = useExpenses()
  const [addOpen, setAddOpen] = useState(false)
  const [limitOpen, setLimitOpen] = useState(false)

  const monthKey = currentMonthKey()
  const monthExpenses = useMemo(() => expenses.filter((e) => isSameMonth(e.date, monthKey)), [expenses, monthKey])
  const spent = monthExpenses.reduce((sum, e) => sum + e.amount, 0)
  const pct = budget.monthlyLimit > 0 ? Math.round((spent / budget.monthlyLimit) * 100) : 0
  const remaining = budget.monthlyLimit - spent
  const overBudget = remaining < 0

  return (
    <>
      <Header title="Money" subtitle="Budget & spending" themeMode={themeMode} onToggleTheme={onToggleTheme} />
      <PageContainer withFab>
        <Card className="mb-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Spent this month</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(spent)}</p>
            </div>
            <button
              onClick={() => setLimitOpen(true)}
              className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:bg-white/5 dark:text-slate-400"
            >
              <Pencil size={11} /> {formatCurrency(budget.monthlyLimit)} limit
            </button>
          </div>
          <ProgressBar value={pct} colorClassName={overBudget ? 'bg-rose-500' : 'bg-indigo-500'} />
          <p className={`mt-2 text-xs ${overBudget ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}`}>
            {overBudget
              ? `${formatCurrency(Math.abs(remaining))} over budget`
              : `${formatCurrency(remaining)} remaining · ${pct}% used`}
          </p>
        </Card>

        <Card className="mb-5">
          <SectionHeader title="Last 7 days" />
          <SpendingTrendChart expenses={expenses} />
        </Card>

        <Card className="mb-5">
          <SectionHeader title="By category" />
          <ExpenseCategoryChart expenses={monthExpenses} />
        </Card>

        <SectionHeader title="Recent expenses" />
        <div className="space-y-2">
          {monthExpenses.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-400 dark:text-slate-500">
              No expenses yet. Tap + to log one.
            </p>
          )}
          {monthExpenses.slice(0, 20).map((e) => (
            <div
              key={e.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white p-3 dark:border-white/10 dark:bg-slate-900"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  {e.note || e.category}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  {e.category} · {formatShortDate(e.date)}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-slate-900 dark:text-white">
                {formatCurrency(e.amount)}
              </p>
              <button
                onClick={() => removeExpense(e.id)}
                aria-label="Delete expense"
                className="shrink-0 rounded-lg p-1.5 text-slate-300 active:text-rose-500 dark:text-slate-600"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </PageContainer>

      <Fab onClick={() => setAddOpen(true)} label="Add expense" />
      <AddExpenseSheet open={addOpen} onClose={() => setAddOpen(false)} onAdd={addExpense} />
      <BudgetLimitSheet
        open={limitOpen}
        onClose={() => setLimitOpen(false)}
        currentLimit={budget.monthlyLimit}
        onSave={setMonthlyLimit}
      />
    </>
  )
}
