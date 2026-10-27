import { useLanguage } from '../i18n'
import { CALENDLY_URL } from '../config/links'
import ApplyButton from './ApplyButton'

const Booking = () => {
  const { t } = useLanguage()

  return (
    <section id="booking" className="border-t border-white/5 bg-surface px-4 py-20 md:py-28">
      <div className="card mx-auto max-w-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
        <span className="section-label">{t.booking.label}</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.booking.title}</h2>
        <p className="mx-auto mb-8 mt-4 max-w-lg text-white/60 sm:text-lg">{t.booking.description}</p>
        <ApplyButton label={t.booking.cta} />
        <p className="mt-4 text-sm text-white/40">{t.booking.ctaNote}</p>
        <p className="mt-8 border-t border-white/10 pt-6 text-sm text-white/50">
          {t.booking.callPrompt}{' '}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          >
            {t.booking.callLink}
          </a>
        </p>
      </div>
    </section>
  )
}

export default Booking
