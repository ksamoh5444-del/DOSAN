import { useLocalStorage } from './useLocalStorage'
import type { Goal } from '../types'
import { uid, clamp } from '../lib/utils'

export function useGoals() {
  const [goals, setGoals] = useLocalStorage<Goal[]>('dosan:goals', [])

  const addGoal = (title: string, target: number, unit: string, color: string) => {
    const goal: Goal = { id: uid(), title, target, unit, current: 0, color, createdAt: Date.now() }
    setGoals((prev) => [goal, ...prev])
  }

  const bumpGoal = (id: string, delta: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, current: clamp(g.current + delta, 0, g.target) } : g)),
    )
  }

  const removeGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }

  return { goals, addGoal, bumpGoal, removeGoal }
}
