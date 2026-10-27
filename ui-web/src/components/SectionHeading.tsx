import type { ReactNode } from 'react'

interface SectionHeadingProps {
  label: string
  title: ReactNode
  description?: string
}

const SectionHeading = ({ label, title, description }: SectionHeadingProps) => (
  <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
    <span className="section-label">{label}</span>
    <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
    {description && <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{description}</p>}
  </div>
)

export default SectionHeading
