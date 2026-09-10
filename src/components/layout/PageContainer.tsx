import type { ReactNode } from 'react'

export function PageContainer({ children, withFab = false }: { children: ReactNode; withFab?: boolean }) {
  return (
    <main className={`mx-auto max-w-md px-5 pt-4 ${withFab ? 'pb-[calc(9.5rem+env(safe-area-inset-bottom))]' : 'pb-safe-nav'}`}>
      {children}
    </main>
  )
}
