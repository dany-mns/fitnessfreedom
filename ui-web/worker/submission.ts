import { ATTRIBUTION_KEYS, type AnswerValue, type Attribution } from '../src/api/payload'
import { isValidEmail } from '../src/components/form/email'
import { isValidPhoneNumber, normalizePhoneNumber } from '../src/components/form/phone'
import { countries } from '../src/config/countries'
import { findForm, type FormField } from '../src/config/forms'
import { translations, type Language } from '../src/i18n/translations'

const MIN_NAME_LENGTH = 2
const MAX_NAME_LENGTH = 100
const MAX_TEXT_LENGTH = 200
const MAX_TEXTAREA_LENGTH = 2000
const MAX_ATTRIBUTION_LENGTH = 500
const MAX_TOKEN_LENGTH = 2048

export interface ValidSubmission {
  campaign: string
  fullName: string
  phone: string
  language: Language
  answers: Record<string, AnswerValue>
  attribution: Attribution
  turnstileToken: string
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isBoundedString = (value: unknown, maxLength: number): value is string =>
  typeof value === 'string' && value.trim() !== '' && value.length <= maxLength

const isValidAnswer = (field: FormField, value: unknown) => {
  switch (field.type) {
    case 'checkbox':
      return (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((item) => field.options.some((option) => option.value === item))
      )
    case 'radio':
    case 'select':
      return field.options.some((option) => option.value === value)
    case 'email':
      return isBoundedString(value, MAX_TEXT_LENGTH) && isValidEmail(value)
    case 'number':
      return isBoundedString(value, MAX_TEXT_LENGTH) && Number.isFinite(Number(value))
    case 'textarea':
      return isBoundedString(value, MAX_TEXTAREA_LENGTH)
    case 'text':
      return isBoundedString(value, MAX_TEXT_LENGTH)
  }
}

const parseAnswers = (fields: FormField[], answers: unknown) => {
  if (!isRecord(answers)) return null
  const hasUnknownKey = Object.keys(answers).some((key) => !fields.some((field) => field.id === key))
  const allValid = fields.every((field) =>
    answers[field.id] === undefined ? !field.required : isValidAnswer(field, answers[field.id]),
  )
  return !hasUnknownKey && allValid ? (answers as Record<string, AnswerValue>) : null
}

const parseAttribution = (attribution: unknown) => {
  if (!isRecord(attribution)) return null
  const entries = ATTRIBUTION_KEYS.map((key) => [key, attribution[key] ?? null] as const)
  const allValid = entries.every(([, value]) => value === null || isBoundedString(value, MAX_ATTRIBUTION_LENGTH))
  return allValid ? (Object.fromEntries(entries) as Attribution) : null
}

const parseFullName = (fullName: unknown) => {
  if (typeof fullName !== 'string') return null
  const trimmed = fullName.trim()
  return trimmed.length >= MIN_NAME_LENGTH && trimmed.length <= MAX_NAME_LENGTH ? trimmed : null
}

const parsePhone = (countryCode: unknown, number: unknown) =>
  typeof countryCode === 'string' &&
  typeof number === 'string' &&
  countries.some((country) => country.dialCode === countryCode) &&
  isValidPhoneNumber(countryCode, number)
    ? countryCode + normalizePhoneNumber(number)
    : null

const isLanguage = (language: unknown): language is Language =>
  typeof language === 'string' && Object.hasOwn(translations, language)

export const parseSubmission = (body: unknown): ValidSubmission | null => {
  if (!isRecord(body)) return null
  const form = typeof body.campaign === 'string' ? findForm(body.campaign) : undefined
  if (!form || !isLanguage(body.language) || !isBoundedString(body.turnstileToken, MAX_TOKEN_LENGTH)) return null

  const fullName = parseFullName(body.fullName)
  const phone = parsePhone(body.phoneCountryCode, body.phoneNumber)
  const answers = parseAnswers(form.fields ?? [], body.answers)
  const attribution = parseAttribution(body.attribution)
  if (!fullName || !phone || !answers || !attribution) return null

  return {
    campaign: form.slug,
    fullName,
    phone,
    language: body.language,
    answers,
    attribution,
    turnstileToken: body.turnstileToken,
  }
}
