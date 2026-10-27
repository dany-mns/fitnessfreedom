import { useLanguage } from '../i18n'
import { CheckIcon } from './icons'
import SectionHeading from './SectionHeading'

const Offer = () => {
  const { t } = useLanguage()

  return (
    <section id="offer" className="border-t border-white/5 bg-surface px-4 py-20 md:py-28">
      <div className="container mx-auto">
        <SectionHeading label={t.offer.label} title={t.offer.title} description={t.offer.description} />

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {t.offer.items.map((item) => (
            <div key={item.title} className="card flex gap-5 p-6 sm:p-8">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary">
                <CheckIcon className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Offer
