import { useLanguage } from '../i18n'

const Hero = () => {
  const { t } = useLanguage()

  return (
    <section
      id="home"
      className="min-h-screen gradient-bg flex items-center justify-center pt-20 px-4"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t.hero.title1}
              <br />
              <span className="text-gradient">{t.hero.title2}</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#booking"
                className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f6b] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition-all hover:scale-105"
              >
                {t.hero.cta}
              </a>
              <a
                href="#about"
                className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
              >
                {t.hero.learnMore}
              </a>
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#ff6b35] to-[#ff8f6b] rounded-2xl blur-2xl opacity-30"></div>
              <div className="relative glass-effect rounded-2xl p-4 sm:p-6">
                <div className="aspect-video bg-[#1a1a2e] rounded-xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/gs2gB8g0R6c"
                    title="Fitness Freedom"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero