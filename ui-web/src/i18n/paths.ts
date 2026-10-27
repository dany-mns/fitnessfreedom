import type { Language } from './translations'

export const localizedPath = (language: Language, path: string) =>
  language === 'en' ? `/en${path === '/' ? '' : path}` : path
