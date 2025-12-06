import { useLanguage } from '../i18n'

const Hero = () => {
  const { t } = useLanguage()

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a0a14]"></div>
      
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#dabc68] rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#e8cc7a] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#1a1a2e] rounded-full blur-[100px]"></div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,107,53,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="absolute top-20 left-10 w-2 h-2 bg-[#dabc68] rounded-full animate-ping"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-[#e8cc7a] rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-40 w-2 h-2 bg-[#dabc68]/50 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>

      <div className="container mx-auto relative z-10">
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
                className="bg-gradient-to-r from-[#dabc68] to-[#e8cc7a] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[#dabc68]/30 transition-all hover:scale-105"
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
              <div className="absolute -inset-4 bg-gradient-to-r from-[#dabc68] to-[#e8cc7a] rounded-2xl blur-2xl opacity-30"></div>
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