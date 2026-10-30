import { useEffect, useRef } from 'react'
import type { Language } from '../../i18n'

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

interface TurnstileOptions {
  sitekey: string
  theme: 'dark'
  language: Language
  appearance: 'interaction-only'
  callback: (token: string) => void
  'expired-callback': () => void
  'error-callback': () => void
}

interface Turnstile {
  render: (container: HTMLElement, options: TurnstileOptions) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: Turnstile
  }
}

let scriptLoading: Promise<void> | null = null

const loadTurnstile = () =>
  (scriptLoading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      scriptLoading = null
      script.remove()
      reject(new Error('Turnstile failed to load'))
    }
    document.head.append(script)
  }))

interface TurnstileWidgetProps {
  language: Language
  onTokenChange: (token: string | null) => void
}

const TurnstileWidget = ({ language, onTokenChange }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const onTokenChangeRef = useRef(onTokenChange)

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange
  })

  useEffect(() => {
    let widgetId: string | undefined
    let unmounted = false
    const clearToken = () => onTokenChangeRef.current(null)

    loadTurnstile()
      .then(() => {
        if (unmounted || !containerRef.current || !window.turnstile) return
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
          theme: 'dark',
          language,
          appearance: 'interaction-only',
          callback: (token) => onTokenChangeRef.current(token),
          'expired-callback': clearToken,
          'error-callback': clearToken,
        })
      })
      .catch(clearToken)

    return () => {
      unmounted = true
      if (widgetId) window.turnstile?.remove(widgetId)
    }
  }, [language])

  return <div ref={containerRef} className="mt-8 flex justify-center empty:hidden" />
}

export default TurnstileWidget
