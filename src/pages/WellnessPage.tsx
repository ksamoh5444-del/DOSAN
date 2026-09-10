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
      <Header title="الصحة" subtitle="الماء والمزاج" themeMode={themeMode} onToggleTheme={onToggleTheme} />
      <PageContainer>
        <div className="mb-5">
          <SectionHeader title="شرب الماء" />
          <WaterTracker />
        </div>

        <div className="mb-5">
          <SectionHeader title="تسجيل المزاج" />
          <MoodTracker />
        </div>

        <div>
          <SectionHeader title="المزاج هذا الأسبوع" />
          <Card>
            <MoodTrendChart entries={entries} />
          </Card>
        </div>
      </PageContainer>
    </>
  )
}
