import { useLanguage } from '../i18n'

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

        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-4 sm:p-8">
            <div
              style={{ minWidth: '320px', height: '500px' }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-[#ff6b35]/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-[#ff6b35]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-white/60 text-lg mb-2">{t.booking.placeholder}</p>
                  <p className="text-white/40 text-sm">
                    {t.booking.hint}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Booking