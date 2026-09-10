import { useState } from 'react'
import { Sheet } from '../common/Sheet'
import { EXPENSE_CATEGORIES, type ExpenseCategory } from '../../types'

export function AddExpenseSheet({
  open,
  onClose,
  onAdd,
}: {
  open: boolean
  onClose: () => void
  onAdd: (amount: number, category: ExpenseCategory, note: string) => void
}) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<ExpenseCategory>('طعام')
  const [note, setNote] = useState('')

  const submit = () => {
    const value = parseFloat(amount)
    if (!value || value <= 0) return
    onAdd(value, category, note)
    setAmount('')
    setNote('')
    setCategory('طعام')
    onClose()
  }

  return (
    <Sheet open={open} onClose={onClose} title="تسجيل مصروف">
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">المبلغ</p>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-indigo-400 dark:border-white/10 dark:bg-white/5">
            <span className="text-lg font-semibold text-slate-400">$</span>
            <input
              autoFocus
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="0.00"
              className="w-full bg-transparent text-lg font-semibold text-slate-900 outline-none dark:text-white"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">الفئة</p>
          <div className="flex flex-wrap gap-2">
            {EXPENSE_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  category === c
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">ملاحظة (اختياري)</p>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="مثال: قهوة مع الأصدقاء"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>

        <button
          onClick={submit}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          إضافة المصروف
        </button>
      </div>
    </Sheet>
  )
}
