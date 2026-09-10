import { Droplet, Minus, Plus } from 'lucide-react'
import { Card } from '../common/Card'
import { ProgressBar } from '../common/ProgressBar'
import { useWater } from '../../hooks/useWater'

export function WaterTracker() {
  const { glasses, addGlass, removeGlass, target } = useWater()
  const pct = Math.round((glasses / target) * 100)

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
            <Droplet size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Water Intake</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {glasses} / {target} glasses
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={removeGlass}
            aria-label="Remove glass"
            className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 active:scale-95 dark:bg-white/10 dark:text-slate-300"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={addGlass}
            aria-label="Add glass"
            className="flex size-8 items-center justify-center rounded-full bg-sky-500 text-white active:scale-95"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <ProgressBar value={pct} colorClassName="bg-sky-500" />

      <div className="mt-3 flex gap-1.5">
        {Array.from({ length: target }).map((_, i) => (
          <div
            key={i}
            className={`h-6 flex-1 rounded-md transition-colors ${
              i < glasses ? 'bg-sky-500' : 'bg-slate-100 dark:bg-white/10'
            }`}
          />
        ))}
      </div>
    </Card>
  )
}
