import { useCallback, useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'dosan:theme'

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = mode === 'dark' || (mode === 'system' && prefersDark)
  root.classList.toggle('dark', isDark)
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      return (window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? 'system'
    } catch {
      return 'system'
    }
  })

  useEffect(() => {
    applyTheme(mode)
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // ignore persistence failures
    }

    if (mode !== 'system') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => applyTheme('system')
    mql.addEventListener('change', listener)
    return () => mql.removeEventListener('change', listener)
  }, [mode])

  const toggle = useCallback(() => {
    setMode((prev) => {
      const isDark =
        prev === 'dark' || (prev === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      return isDark ? 'light' : 'dark'
    })
  }, [])

  return { mode, setMode, toggle }
}
