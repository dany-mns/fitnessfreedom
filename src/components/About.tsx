import { useLanguage } from '../i18n'

const About = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 md:py-32 bg-[#0f0f1a] px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#ff6b35] to-[#ff8f6b] rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative aspect-[3/4] bg-[#1a1a2e] rounded-2xl overflow-hidden">
                <img 
                  src="/top.jpg" 
                  alt="Chris - Fitness Coach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <span className="text-[#ff6b35] font-semibold text-sm uppercase tracking-wider">
              {t.about.label}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              {t.about.title1}
              <br />
              <span className="text-gradient">{t.about.title2}</span>
            </h2>
            <div className="space-y-4 text-white/70 text-base sm:text-lg">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#ff6b35]">500+</div>
                <div className="text-white/60 text-sm sm:text-base">{t.about.stat1}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#ff6b35]">10+</div>
                <div className="text-white/60 text-sm sm:text-base">{t.about.stat2}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#ff6b35]">98%</div>
                <div className="text-white/60 text-sm sm:text-base">{t.about.stat3}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About