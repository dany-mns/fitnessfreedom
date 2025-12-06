import { useLanguage } from '../i18n'

const CALENDLY_URL = 'https://calendly.com/chris-fitnessfreedom/call'

const Booking = () => {
  const { t } = useLanguage()

  return (
    <section id="booking" className="py-20 md:py-32 gradient-bg px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#ff6b35] font-semibold text-sm uppercase tracking-wider">
            {t.booking.label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            {t.booking.title1} <span className="text-gradient">{t.booking.title2}</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            {t.booking.description}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 sm:p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#ff6b35] to-[#ff8f6b] rounded-full flex items-center justify-center shadow-lg shadow-[#ff6b35]/30">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t.booking.ctaTitle}
            </h3>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              {t.booking.ctaDescription}
            </p>
            
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#ff6b35] to-[#ff8f6b] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-[#ff6b35]/30 hover:shadow-2xl hover:shadow-[#ff6b35]/40 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff8f6b] to-[#ff6b35] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <svg
                className="w-6 h-6 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="relative z-10">{t.booking.ctaButton}</span>
              <svg
                className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            
            <p className="text-white/40 text-sm mt-6">
              {t.booking.ctaNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Booking