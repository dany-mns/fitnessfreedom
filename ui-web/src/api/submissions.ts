import type { Language } from '../i18n'

export type AnswerValue = string | string[]

export interface SubmissionPayload {
  campaign: string
  fullName: string
  phoneCountryCode: string
  phoneNumber: string
  answers: Record<string, AnswerValue>
  language: Language
  attribution: {
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    referrer: string | null
  }
}

const API_URL = import.meta.env.VITE_API_URL ?? ''

export const readAttribution = (): SubmissionPayload['attribution'] => {
  const params = new URLSearchParams(window.location.search)
  return {
    utmSource: params.get('utm_source')?.slice(0, 100) ?? null,
    utmMedium: params.get('utm_medium')?.slice(0, 100) ?? null,
    utmCampaign: params.get('utm_campaign')?.slice(0, 100) ?? null,
    referrer: document.referrer.slice(0, 500) || null,
  }
}

export const submitForm = async (payload: SubmissionPayload) => {
  const response = await fetch(`${API_URL}/api/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(`Submission failed with status ${response.status}`)
  }
}
