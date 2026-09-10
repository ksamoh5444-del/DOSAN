import { Plus } from 'lucide-react'

export function Fab({ onClick, label = 'Add' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-5 z-30 flex size-14 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 active:scale-95 dark:shadow-indigo-900/50"
    >
      <Plus size={26} />
    </button>
  )
}
