import { CheckSquare, Home, Target, Wallet, Sparkles } from 'lucide-react'
import type { Page } from '../../App'

const ITEMS: { key: Page; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'الرئيسية', icon: Home },
  { key: 'tasks', label: 'المهام', icon: CheckSquare },
  { key: 'money', label: 'المصروفات', icon: Wallet },
  { key: 'goals', label: 'الأهداف', icon: Target },
  { key: 'wellness', label: 'الصحة', icon: Sparkles },
]

export function BottomNav({ page, onChange }: { page: Page; onChange: (p: Page) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/90 backdrop-blur-lg safe-bottom dark:border-white/10 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-1">
        {ITEMS.map(({ key, label, icon: Icon }) => {
          const active = page === key
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className="flex flex-1 flex-col items-center gap-1 py-2.5"
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.4 : 1.9}
                className={active ? 'text-indigo-500' : 'text-slate-400 dark:text-slate-500'}
              />
              <span
                className={`text-[10.5px] font-medium ${active ? 'text-indigo-500' : 'text-slate-400 dark:text-slate-500'}`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
