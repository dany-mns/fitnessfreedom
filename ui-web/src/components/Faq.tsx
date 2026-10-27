import { useLanguage } from '../i18n'
import { ChevronIcon } from './icons'
import SectionHeading from './SectionHeading'

const Faq = () => {
  const { t } = useLanguage()

  return (
    <section id="faq" className="border-t border-white/5 bg-surface px-4 py-20 md:py-28">
      <div className="container mx-auto">
        <SectionHeading label={t.faq.label} title={t.faq.title} />

        <div className="mx-auto max-w-3xl divide-y divide-white/10 border-y border-white/10">
          {t.faq.items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-semibold text-white transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronIcon className="shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-6 pr-10 leading-relaxed text-white/60">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
