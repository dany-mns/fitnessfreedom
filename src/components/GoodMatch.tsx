import { useLanguage } from '../i18n'

const GoodMatch = () => {
  const { t } = useLanguage()

  const points = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t.match.point1Title,
      description: t.match.point1Desc,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t.match.point2Title,
      description: t.match.point2Desc,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: t.match.point3Title,
      description: t.match.point3Desc,
    },
  ]

  return (
    <section id="match" className="py-20 md:py-32 gradient-bg px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#dabc68] font-semibold text-sm uppercase tracking-wider">
            {t.match.label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            {t.match.title1} <span className="text-gradient">{t.match.title2}</span> {t.match.title3}
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            {t.match.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {points.map((point, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-6 sm:p-8 hover-lift text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#dabc68] to-[#e8cc7a] rounded-2xl flex items-center justify-center text-white">
                {point.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {point.title}
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#booking"
            className="inline-block bg-gradient-to-r from-[#dabc68] to-[#e8cc7a] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[#dabc68]/30 transition-all hover:scale-105"
          >
            {t.match.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

export default GoodMatch