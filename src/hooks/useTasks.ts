import { useLocalStorage } from './useLocalStorage'
import type { Priority, Task } from '../types'
import { uid } from '../lib/utils'

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('dosan:tasks', [])

  const addTask = (title: string, priority: Priority, dueDate?: string) => {
    const task: Task = { id: uid(), title, done: false, priority, createdAt: Date.now(), dueDate }
    setTasks((prev) => [task, ...prev])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.done))
  }

  return { tasks, addTask, toggleTask, removeTask, clearCompleted }
}
