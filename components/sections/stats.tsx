import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

interface Stat {
  label: string
  value: string
  icon?: string
}

interface StatsProps {
  stats: Stat[]
}

export function Stats({ stats }: StatsProps) {
  return (
    <Section variant="gray">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              {stat.icon && <div className="mb-4 text-4xl">{stat.icon}</div>}
              <div className="text-4xl font-bold text-primary-600 font-heading">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
