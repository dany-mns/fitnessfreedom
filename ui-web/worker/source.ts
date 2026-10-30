import type { Attribution } from '../src/api/payload'

const CLICK_ID_PLATFORMS = [
  ['gclid', 'google'],
  ['fbclid', 'facebook'],
  ['ttclid', 'tiktok'],
] as const

const referrerHost = (referrer: string | null) => {
  if (!referrer) return null
  try {
    return new URL(referrer).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

export const trafficSource = (attribution: Attribution) =>
  attribution.utmSource ??
  CLICK_ID_PLATFORMS.find(([clickId]) => attribution[clickId])?.[1] ??
  referrerHost(attribution.referrer) ??
  'direct'
