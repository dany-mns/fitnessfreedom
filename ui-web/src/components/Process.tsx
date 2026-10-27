import { useLanguage } from '../i18n'
import SectionHeading from './SectionHeading'

const Process = () => {
  const { t } = useLanguage()

  return (
    <section id="process" className="border-t border-white/5 bg-surface px-4 py-20 md:py-28">
      <div className="container mx-auto">
        <SectionHeading label={t.process.label} title={t.process.title} />

        <ol className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
          {t.process.steps.map((step, index) => (
            <li key={step.title} className="border-t border-white/10 pt-6">
              <span className="font-mono text-sm font-semibold text-primary">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-white/60">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Process
