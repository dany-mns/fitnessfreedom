import { TRACKED_PARAMS, type Attribution, type TrackedParam } from './payload'

const STORAGE_KEY = 'ff_attribution'
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000
const MAX_PARAM_LENGTH = 255
const MAX_URL_LENGTH = 500

let sessionAttribution: Attribution | null = null

interface StoredAttribution {
  attribution: Attribution
  capturedAt: number
}

const truncate = (value: string | null, maxLength: number) => (value ? value.slice(0, maxLength) : null)

const externalReferrer = () => {
  try {
    return document.referrer && new URL(document.referrer).origin !== window.location.origin ? document.referrer : null
  } catch {
    return null
  }
}

const currentLandingPage = () => truncate(window.location.pathname + window.location.search, MAX_URL_LENGTH)

const fromCurrentVisit = (): Attribution | null => {
  const params = new URLSearchParams(window.location.search)
  const tracked = Object.fromEntries(
    Object.entries(TRACKED_PARAMS).map(([key, param]) => [key, truncate(params.get(param), MAX_PARAM_LENGTH)]),
  ) as Record<TrackedParam, string | null>
  const referrer = truncate(externalReferrer(), MAX_URL_LENGTH)

  if (!referrer && !Object.values(tracked).some(Boolean)) return null
  return { ...tracked, referrer, landingPage: currentLandingPage() }
}

const loadStored = (): StoredAttribution | null => {
  try {
    const stored: StoredAttribution | null = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    return stored && Date.now() - stored.capturedAt < MAX_AGE_MS ? stored : null
  } catch {
    return null
  }
}

export const captureAttribution = () => {
  const attribution = fromCurrentVisit()
  if (!attribution) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ attribution, capturedAt: Date.now() }))
  } catch {
    sessionAttribution = attribution
  }
}

const directVisit = (): Attribution => ({
  ...(Object.fromEntries(Object.keys(TRACKED_PARAMS).map((key) => [key, null])) as Record<TrackedParam, null>),
  referrer: null,
  landingPage: currentLandingPage(),
})

export const readAttribution = (): Attribution => loadStored()?.attribution ?? sessionAttribution ?? directVisit()
