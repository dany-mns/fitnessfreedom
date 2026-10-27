import { useLanguage } from '../i18n'
import { CheckIcon, CrossIcon } from './icons'
import SectionHeading from './SectionHeading'

const GoodMatch = () => {
  const { t } = useLanguage()

  return (
    <section id="match" className="border-t border-white/5 bg-surface px-4 py-20 md:py-28">
      <div className="container mx-auto">
        <SectionHeading label={t.match.label} title={t.match.title} />

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="card p-6 sm:p-10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">{t.match.forYouTitle}</h3>
            <ul className="mt-6 divide-y divide-white/10">
              {t.match.points.map((point) => (
                <li key={point.title} className="flex gap-4 py-6 first:pt-0 last:pb-0">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-ink">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="font-semibold text-white sm:text-lg">{point.title}</p>
                    <p className="mt-1.5 leading-relaxed text-white/60">{point.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 p-6 sm:p-10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/40">{t.match.notForYouTitle}</h3>
            <ul className="mt-6 space-y-5">
              {t.match.notForYou.map((reason) => (
                <li key={reason} className="flex gap-4 text-white/55">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/40">
                    <CrossIcon className="h-3 w-3" />
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoodMatch
