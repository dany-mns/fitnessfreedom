import type { Language } from '../i18n'
import type { Attribution } from './attribution'

export type AnswerValue = string | string[]

export interface SubmissionPayload {
  campaign: string
  fullName: string
  phoneCountryCode: string
  phoneNumber: string
  answers: Record<string, AnswerValue>
  language: Language
  attribution: Attribution
}

const API_URL = import.meta.env.VITE_API_URL ?? ''

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
