import { useLanguage } from '../i18n'

const About = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="border-t border-white/5 bg-surface px-4 py-20 md:py-28">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="w-full max-w-md flex-1 lg:max-w-none">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-ink">
              <img src="/top.jpg" alt="Chris Manastireanu" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <span className="section-label">{t.about.label}</span>
            <h2 className="mb-6 mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {t.about.title1}
              <span className="mt-2 block text-xl font-semibold text-primary sm:text-2xl">{t.about.title2}</span>
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-white/60 sm:text-lg">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
