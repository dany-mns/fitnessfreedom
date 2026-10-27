import { useState, useEffect } from 'react'
import { APPLY_FORM_PATH } from '../config/links'
import { localizedPath, useLanguage } from '../i18n'
import { Link } from 'react-router-dom'
import { useNavItems } from './useNavItems'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, t } = useLanguage()
  const applyPath = localizedPath(language, APPLY_FORM_PATH)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = useNavItems()

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'border-b border-white/5 bg-surface' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img 
              src="/logo.webp" 
              alt="Fitness Freedom" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <span className="text-white font-bold text-lg md:text-xl tracking-tight">
              Fitness Freedom
            </span>
          </a>

          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/70 hover:text-white transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <Link
              to={applyPath}
              className="hidden sm:inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-primary-light"
            >
              {t.nav.apply}
            </Link>

            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white/80 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link to={applyPath} className="btn-primary mt-2">
                {t.nav.apply}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header