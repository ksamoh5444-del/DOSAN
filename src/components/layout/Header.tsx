import { Moon, Sun, SunMoon } from 'lucide-react'
import type { ThemeMode } from '../../hooks/useTheme'

export function Header({
  title,
  subtitle,
  themeMode,
  onToggleTheme,
}: {
  title: string
  subtitle?: string
  themeMode: ThemeMode
  onToggleTheme: () => void
}) {
  const Icon = themeMode === 'system' ? SunMoon : themeMode === 'dark' ? Moon : Sun

  return (
    <header className="safe-top sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 px-5 pb-3 pt-4 backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-md items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 active:scale-95 dark:bg-white/10 dark:text-slate-300"
        >
          <Icon size={18} />
        </button>
      </div>
    </header>
  )
}
