import { Header } from '../components/layout/Header'
import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { SectionHeader } from '../components/common/SectionHeader'
import { WaterTracker } from '../components/water/WaterTracker'
import { MoodTracker } from '../components/mood/MoodTracker'
import { MoodTrendChart } from '../components/mood/MoodTrendChart'
import { useMood } from '../hooks/useMood'
import type { ThemeMode } from '../hooks/useTheme'

export function WellnessPage({ themeMode, onToggleTheme }: { themeMode: ThemeMode; onToggleTheme: () => void }) {
  const { entries } = useMood()

  return (
    <>
      <Header title="Wellness" subtitle="Water & mood" themeMode={themeMode} onToggleTheme={onToggleTheme} />
      <PageContainer>
        <div className="mb-5">
          <SectionHeader title="Water Intake" />
          <WaterTracker />
        </div>

        <div className="mb-5">
          <SectionHeader title="Mood Check-in" />
          <MoodTracker />
        </div>

        <div>
          <SectionHeader title="Mood this week" />
          <Card>
            <MoodTrendChart entries={entries} />
          </Card>
        </div>
      </PageContainer>
    </>
  )
}
