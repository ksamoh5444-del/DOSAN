import { useLocalStorage } from './useLocalStorage'
import type { Mood, MoodEntry } from '../types'
import { todayISO, uid } from '../lib/utils'

export function useMood() {
  const [entries, setEntries] = useLocalStorage<MoodEntry[]>('dosan:mood', [])

  const today = todayISO()
  const todayEntry = entries.find((e) => e.date === today)

  const logMood = (mood: Mood, note?: string) => {
    setEntries((prev) => {
      const withoutToday = prev.filter((e) => e.date !== today)
      const entry: MoodEntry = { id: uid(), date: today, mood, note: note || undefined, createdAt: Date.now() }
      return [entry, ...withoutToday]
    })
  }

  return { entries, todayEntry, logMood }
}
