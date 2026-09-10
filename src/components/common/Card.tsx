import type { ReactNode } from 'react'

export function Card({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp
      onClick={onClick}
      className={`rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm shadow-slate-200/50 dark:border-white/10 dark:bg-slate-900 dark:shadow-none ${onClick ? 'text-start active:scale-[0.98] transition-transform' : ''} ${className}`}
    >
      {children}
    </Comp>
  )
}
