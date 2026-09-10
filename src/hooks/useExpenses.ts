import { useLocalStorage } from './useLocalStorage'
import type { BudgetSettings, Expense, ExpenseCategory } from '../types'
import { todayISO, uid } from '../lib/utils'

export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('dosan:expenses', [])
  const [budget, setBudget] = useLocalStorage<BudgetSettings>('dosan:budget', { monthlyLimit: 1000 })

  const addExpense = (amount: number, category: ExpenseCategory, note: string, date = todayISO()) => {
    const expense: Expense = { id: uid(), amount, category, note: note || undefined, date, createdAt: Date.now() }
    setExpenses((prev) => [expense, ...prev])
  }

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  const setMonthlyLimit = (limit: number) => {
    setBudget({ monthlyLimit: limit })
  }

  return { expenses, addExpense, removeExpense, budget, setMonthlyLimit }
}
