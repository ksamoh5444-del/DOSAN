import { useState } from 'react'
import { BottomNav } from './components/layout/BottomNav'
import { InstallPrompt } from './components/common/InstallPrompt'
import { HomePage } from './pages/HomePage'
import { TasksPage } from './pages/TasksPage'
import { MoneyPage } from './pages/MoneyPage'
import { GoalsPage } from './pages/GoalsPage'
import { WellnessPage } from './pages/WellnessPage'
import { useTheme } from './hooks/useTheme'

export type Page = 'home' | 'tasks' | 'money' | 'goals' | 'wellness'

function App() {
  const [page, setPage] = useState<Page>('home')
  const { mode, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {page === 'home' && <HomePage themeMode={mode} onToggleTheme={toggle} onNavigate={setPage} />}
      {page === 'tasks' && <TasksPage themeMode={mode} onToggleTheme={toggle} />}
      {page === 'money' && <MoneyPage themeMode={mode} onToggleTheme={toggle} />}
      {page === 'goals' && <GoalsPage themeMode={mode} onToggleTheme={toggle} />}
      {page === 'wellness' && <WellnessPage themeMode={mode} onToggleTheme={toggle} />}

      <InstallPrompt />
      <BottomNav page={page} onChange={setPage} />
    </div>
  )
}

export default App
