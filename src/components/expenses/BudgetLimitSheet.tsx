import { useState } from 'react'
import { Sheet } from '../common/Sheet'

export function BudgetLimitSheet({
  open,
  onClose,
  currentLimit,
  onSave,
}: {
  open: boolean
  onClose: () => void
  currentLimit: number
  onSave: (limit: number) => void
}) {
  const [value, setValue] = useState(String(currentLimit))

  const submit = () => {
    const num = parseFloat(value)
    if (!num || num <= 0) return
    onSave(num)
    onClose()
  }

  return (
    <Sheet open={open} onClose={onClose} title="الحد الشهري للميزانية">
      <div className="space-y-4">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-indigo-400 dark:border-white/10 dark:bg-white/5">
          <span className="text-lg font-semibold text-slate-400">$</span>
          <input
            autoFocus
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, ''))}
            className="w-full bg-transparent text-lg font-semibold text-slate-900 outline-none dark:text-white"
          />
        </div>
        <button onClick={submit} className="w-full rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white">
          حفظ الحد
        </button>
      </div>
    </Sheet>
  )
}
