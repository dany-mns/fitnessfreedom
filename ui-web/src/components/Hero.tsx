import { useLanguage } from '../i18n'
import ApplyButton from './ApplyButton'

const Hero = () => {
  const { t } = useLanguage()

  const stats = [
    { value: '500+', label: t.hero.stat1 },
    { value: '10+', label: t.hero.stat2 },
    { value: '3×', label: t.hero.stat3 },
  ]

  return (
    <section id="home" className="bg-surface px-4 pb-16 pt-32 lg:pb-24 lg:pt-40">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <span className="section-label">{t.hero.eyebrow}</span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-[3.5rem]">
              {t.hero.title1}
              <span className="block text-balance text-primary">{t.hero.title2}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg lg:mx-0">
              {t.hero.description}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <ApplyButton label={t.hero.cta} />
              <a href="#testimonials" className="btn-secondary">
                {t.hero.secondaryCta}
              </a>
            </div>
            <p className="mt-4 text-sm text-white/40">{t.hero.ctaNote}</p>
            <a
              href="#testimonials"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-primary/50 hover:text-white"
            >
              <span className="text-primary" aria-hidden="true">★</span>
              {t.hero.proof}
            </a>

            <div className="mt-10 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="px-2 first:pl-0 lg:px-6">
                  <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/50 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-xl flex-1 lg:max-w-none">
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-ink">
              <iframe
                className="h-full w-full"
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
    </section>
  )
}

export default Hero
