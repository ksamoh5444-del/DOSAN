export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  done: boolean
  priority: Priority
  createdAt: number
  dueDate?: string // YYYY-MM-DD
}

export const EXPENSE_CATEGORIES = [
  'طعام',
  'مواصلات',
  'تسوق',
  'فواتير',
  'صحة',
  'ترفيه',
  'أخرى',
] as const

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]

export interface Expense {
  id: string
  amount: number
  category: ExpenseCategory
  note?: string
  date: string // YYYY-MM-DD
  createdAt: number
}

export interface Goal {
  id: string
  title: string
  unit: string
  target: number
  current: number
  color: string
  createdAt: number
}

export interface WaterDay {
  date: string // YYYY-MM-DD
  glasses: number
}

export type Mood = 1 | 2 | 3 | 4 | 5

export interface MoodEntry {
  id: string
  date: string // YYYY-MM-DD
  mood: Mood
  note?: string
  createdAt: number
}

export interface BudgetSettings {
  monthlyLimit: number
}
