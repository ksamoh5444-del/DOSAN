import { useLocalStorage } from './useLocalStorage'
import type { WaterDay } from '../types'
import { clamp, todayISO } from '../lib/utils'

const DAILY_TARGET = 8

export function useWater() {
  const [days, setDays] = useLocalStorage<WaterDay[]>('dosan:water', [])

  const today = todayISO()
  const todayEntry = days.find((d) => d.date === today)
  const glasses = todayEntry?.glasses ?? 0

  const setGlasses = (value: number) => {
    const next = clamp(value, 0, 20)
    setDays((prev) => {
      const exists = prev.some((d) => d.date === today)
      if (exists) return prev.map((d) => (d.date === today ? { ...d, glasses: next } : d))
      return [...prev, { date: today, glasses: next }]
    })
  }

  const addGlass = () => setGlasses(glasses + 1)
  const removeGlass = () => setGlasses(glasses - 1)

  return { days, glasses, addGlass, removeGlass, target: DAILY_TARGET }
}
