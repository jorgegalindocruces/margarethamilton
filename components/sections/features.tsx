import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

interface Feature {
  title: string
  description: string
  icon?: string
}

interface FeaturesProps {
  title?: string
  subtitle?: string
  features: Feature[]
}

export function Features({ title, subtitle, features }: FeaturesProps) {
  return (
    <Section>
      <Container>
        {(title || subtitle) && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            {subtitle && (
              <p className="mb-4 text-lg font-medium text-primary-600">{subtitle}</p>
            )}
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 font-heading sm:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              {feature.icon && (
                <div className="mb-4 text-4xl">{feature.icon}</div>
              )}
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
