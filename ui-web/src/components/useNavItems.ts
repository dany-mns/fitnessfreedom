import { useLanguage } from '../i18n'

export const useNavItems = () => {
  const { t } = useLanguage()
  return [
    { label: t.nav.offer, href: '#offer' },
    { label: t.nav.results, href: '#testimonials' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.faq, href: '#faq' },
  ]
}
