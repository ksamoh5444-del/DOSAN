export function todayISO(): string {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10)
}

export function currentMonthKey(): string {
  return todayISO().slice(0, 7) // YYYY-MM
}

export function isSameMonth(dateISO: string, monthKey: string): boolean {
  return dateISO.startsWith(monthKey)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatShortDate(dateISO: string): string {
  const d = new Date(`${dateISO}T00:00:00`)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function weekdayLabel(dateISO: string): string {
  const d = new Date(`${dateISO}T00:00:00`)
  return d.toLocaleDateString(undefined, { weekday: 'short' })
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

export function lastNDays(n: number): string[] {
  const days: string[] = []
  const now = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const offset = d.getTimezoneOffset()
    days.push(new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10))
  }
  return days
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}
