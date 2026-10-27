import { useState, type ReactNode } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { findForm, type FormDefinition } from '../../config/forms'
import { CALENDLY_URL } from '../../config/links'
import { localizedPath, useLanguage } from '../../i18n'
import LeadForm from './LeadForm'
import { CheckIcon } from '../icons'

const PageShell = ({ children }: { children: ReactNode }) => {
  const { language, t } = useLanguage()
  const location = useLocation()
  const homePath = localizedPath(language, '/')
  const switchPath =
    (language === 'en' ? location.pathname.replace(/^\/en/, '') : `/en${location.pathname}`) + location.search

  return (
    <div className="min-h-screen bg-surface text-white">
      <header className="border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <Link to={homePath} className="flex items-center gap-3">
            <img src="/logo.webp" alt="Fitness Freedom" className="h-10 w-10 rounded-full object-cover" />
            <span className="hidden text-lg font-bold tracking-tight sm:inline">Fitness Freedom</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link
              to={switchPath}
              className="rounded-full border border-white/15 px-3 py-1.5 font-semibold uppercase tracking-wider text-white/70 transition-colors hover:border-primary hover:text-primary"
            >
              {language === 'en' ? 'RO' : 'EN'}
            </Link>
            <Link to={homePath} className="rounded-full px-3 py-1.5 text-white/60 transition-colors hover:text-white">
              {t.form.backHome}
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12 lg:py-20">{children}</main>
      <footer className="pb-8 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Fitness Freedom
      </footer>
    </div>
  )
}

const CampaignPitch = ({ form }: { form: FormDefinition }) => {
  const { language, t } = useLanguage()

  return (
    <section className="lg:sticky lg:top-12">
      <span className="section-label">{form.badge[language]}</span>
      <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        {form.title[language]} <span className="text-primary">{form.highlight[language]}</span>
      </h1>
      <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">{form.description[language]}</p>
      {form.perks && (
        <ul className="mt-8 space-y-3">
          {form.perks.map((perk) => (
            <li key={perk.en} className="flex items-center gap-3 text-white/80">
              <CheckIcon className="h-4 w-4 shrink-0 text-primary" />
              {perk[language]}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 text-sm text-white/40">{t.form.responseTime}</p>
    </section>
  )
}

const SuccessState = ({ form }: { form: FormDefinition }) => {
  const { language, t } = useLanguage()

  return (
    <div className="py-8 text-center" role="status">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/50 text-primary">
        <CheckIcon className="h-7 w-7" />
      </div>
      <h2 className="mt-6 text-2xl font-bold">{t.form.successTitle}</h2>
      <p className="mx-auto mt-3 max-w-sm text-white/65">{form.successMessage?.[language] ?? t.form.successMessage}</p>
      <div className="mt-10 flex flex-col gap-3">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          {t.form.bookCall}
        </a>
        <Link to={localizedPath(language, '/')} className="rounded-full px-8 py-3 font-semibold text-white/70 transition-colors hover:text-white">
          {t.form.backHome}
        </Link>
      </div>
    </div>
  )
}

const FormCard = ({ children }: { children: ReactNode }) => (
  <div className="card p-6 sm:p-10">{children}</div>
)

const FormPage = () => {
  const { slug } = useParams()
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const form = findForm(slug)

  if (!form) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md pt-16 text-center">
          <h1 className="text-3xl font-bold">{t.form.notFoundTitle}</h1>
          <p className="mt-4 text-white/60">{t.form.notFoundMessage}</p>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-20">
        <CampaignPitch form={form} />
        <FormCard>{submitted ? <SuccessState form={form} /> : <LeadForm form={form} onSuccess={() => setSubmitted(true)} />}</FormCard>
      </div>
    </PageShell>
  )
}

export default FormPage
