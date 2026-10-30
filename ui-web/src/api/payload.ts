import type { Language } from '../i18n/translations'

export const TRACKED_PARAMS = {
  utmSource: 'utm_source',
  utmMedium: 'utm_medium',
  utmCampaign: 'utm_campaign',
  utmTerm: 'utm_term',
  utmContent: 'utm_content',
  gclid: 'gclid',
  fbclid: 'fbclid',
  ttclid: 'ttclid',
} as const

export type TrackedParam = keyof typeof TRACKED_PARAMS

export type Attribution = Record<TrackedParam | 'referrer' | 'landingPage', string | null>

export const ATTRIBUTION_KEYS = [...(Object.keys(TRACKED_PARAMS) as TrackedParam[]), 'referrer', 'landingPage'] as const

export type AnswerValue = string | string[]

export interface SubmissionPayload {
  campaign: string
  fullName: string
  phoneCountryCode: string
  phoneNumber: string
  answers: Record<string, AnswerValue>
  language: Language
  attribution: Attribution
  turnstileToken: string
}
