import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { translations } from './translations'
import type { Language, Translations } from './translations'

interface LanguageContextType {
  language: Language
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  
  const language: Language = useMemo(() => {
    return location.pathname.startsWith('/en') ? 'en' : 'ro'
  }, [location.pathname])

  const value = useMemo(() => ({
    language,
    t: translations[language],
  }), [language])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}