import { useEffect, useState } from 'react'
import { Share, SquarePlus, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISSED_KEY = 'dosan:install-dismissed'

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIOSHint, setShowIOSHint] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISSED_KEY) === '1') setDismissed(true)
    } catch {
      // ignore
    }

    if (isStandalone()) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)

    if (isIOS()) {
      setShowIOSHint(true)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try {
      window.localStorage.setItem(DISMISSED_KEY, '1')
    } catch {
      // ignore
    }
  }

  const visible = !dismissed && (deferredPrompt !== null || showIOSHint)
  if (!visible) return null

  return (
    <div className="animate-toast-in fixed bottom-[calc(11rem+env(safe-area-inset-bottom))] left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 pr-2 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-800/95">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
          <SquarePlus size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-900 dark:text-white">Add Dosan to Home Screen</p>
          {deferredPrompt ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">Install for quick, full-screen access.</p>
          ) : (
            <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              Tap <Share size={13} className="inline" /> then "Add to Home Screen"
            </p>
          )}
        </div>
        {deferredPrompt && (
          <button
            onClick={async () => {
              await deferredPrompt.prompt()
              await deferredPrompt.userChoice
              setDeferredPrompt(null)
              dismiss()
            }}
            className="shrink-0 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white active:bg-indigo-600"
          >
            Install
          </button>
        )}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
