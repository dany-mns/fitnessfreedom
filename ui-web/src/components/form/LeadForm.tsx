import { useState, type FormEvent } from 'react'
import { readAttribution, submitForm, type AnswerValue } from '../../api/submissions'
import { countries, DEFAULT_COUNTRY_ISO, type Country } from '../../config/countries'
import type { FormDefinition, FormField } from '../../config/forms'
import { useLanguage, type Translations } from '../../i18n'
import FormFieldInput from './FormFieldInput'
import PhoneInput from './PhoneInput'
import QuestionBlock from './QuestionBlock'
import { fieldClass } from './fieldClass'
import { isValidPhoneNumber, normalizePhoneNumber } from './phone'

interface LeadFormProps {
  form: FormDefinition
  onSuccess: () => void
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FULL_NAME = 'fullName'
const PHONE = 'phone'

const isBlank = (value: AnswerValue | undefined) =>
  value === undefined || (Array.isArray(value) ? value.length === 0 : value.trim() === '')

const fieldError = (field: FormField, value: AnswerValue | undefined, t: Translations) => {
  if (isBlank(value)) return field.required ? t.form.required : null
  if (field.type === 'email' && !EMAIL_PATTERN.test(String(value))) return t.form.invalidEmail
  return null
}

const LeadForm = ({ form, onSuccess }: LeadFormProps) => {
  const { language, t } = useLanguage()
  const fields = form.fields ?? []
  const [fullName, setFullName] = useState('')
  const [country, setCountry] = useState<Country>(countries.find((option) => option.iso === DEFAULT_COUNTRY_ISO)!)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')

  const errors: Record<string, string | null> = {
    [FULL_NAME]: fullName.trim().length < 2 ? t.form.invalidName : null,
    [PHONE]: isValidPhoneNumber(country.dialCode, phoneNumber) ? null : t.form.invalidPhone,
    ...Object.fromEntries(fields.map((field) => [field.id, fieldError(field, answers[field.id], t)])),
  }
  const visibleError = (key: string) => (submitAttempted || touched[key] ? errors[key] : null)
  const markTouched = (key: string) => () => setTouched((current) => ({ ...current, [key]: true }))

  const requiredKeys = [FULL_NAME, PHONE, ...fields.filter((field) => field.required).map((field) => field.id)]
  const completedCount = requiredKeys.filter((key) => !errors[key]).length
  const progress = Math.round((completedCount / requiredKeys.length) * 100)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitAttempted(true)
    if (Object.values(errors).some(Boolean)) return

    setStatus('submitting')
    try {
      await submitForm({
        campaign: form.slug,
        fullName: fullName.trim(),
        phoneCountryCode: country.dialCode,
        phoneNumber: normalizePhoneNumber(phoneNumber),
        answers: Object.fromEntries(Object.entries(answers).filter(([, value]) => !isBlank(value))),
        language,
        attribution: readAttribution(),
      })
      onSuccess()
    } catch {
      setStatus('error')
    }
  }

  const ids = (key: string) => ({ labelId: `${key}-label`, errorId: `${key}-error` })

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wider">
          <span className="text-white/40">{form.badge[language]}</span>
          <span className="text-[#dabc68] tabular-nums">
            {completedCount}/{requiredKeys.length} {t.form.progress}
          </span>
        </div>
        <div className="h-px overflow-hidden bg-white/10" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="h-full bg-[#dabc68] transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="divide-y divide-white/10">
        <QuestionBlock index={1} label={t.form.fullNameLabel} error={visibleError(FULL_NAME)} {...ids(FULL_NAME)}>
          <input
            type="text"
            autoComplete="name"
            value={fullName}
            placeholder={t.form.fullNamePlaceholder}
            aria-labelledby={ids(FULL_NAME).labelId}
            aria-invalid={Boolean(visibleError(FULL_NAME))}
            aria-describedby={visibleError(FULL_NAME) ? ids(FULL_NAME).errorId : undefined}
            onChange={(event) => setFullName(event.target.value)}
            onBlur={markTouched(FULL_NAME)}
            className={fieldClass(Boolean(visibleError(FULL_NAME)))}
          />
        </QuestionBlock>

        <QuestionBlock index={2} label={t.form.phoneLabel} hint={t.form.phoneHint} error={visibleError(PHONE)} {...ids(PHONE)}>
          <PhoneInput
            language={language}
            country={country}
            number={phoneNumber}
            countryLabel={t.form.countryLabel}
            placeholder={t.form.phonePlaceholder}
            hasError={Boolean(visibleError(PHONE))}
            onCountryChange={setCountry}
            onNumberChange={setPhoneNumber}
            onBlur={markTouched(PHONE)}
            {...ids(PHONE)}
          />
        </QuestionBlock>

        {fields.map((field, position) => (
          <QuestionBlock
            key={field.id}
            index={position + 3}
            label={field.label[language]}
            hint={field.hint?.[language]}
            optionalLabel={field.required ? undefined : t.form.optional}
            error={visibleError(field.id)}
            {...ids(field.id)}
          >
            <FormFieldInput
              field={field}
              value={answers[field.id]}
              language={language}
              selectPlaceholder={t.form.selectPlaceholder}
              hasError={Boolean(visibleError(field.id))}
              onChange={(value) => setAnswers((current) => ({ ...current, [field.id]: value }))}
              onBlur={markTouched(field.id)}
              {...ids(field.id)}
            />
          </QuestionBlock>
        ))}
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-8 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {t.form.errorGeneric}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#dabc68] px-8 py-3.5 font-semibold text-[#1a1a2e] transition-colors hover:bg-[#e8cc7a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dabc68]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f1a] disabled:cursor-wait disabled:opacity-70"
      >
        {status === 'submitting' ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#1a1a2e]/30 border-t-[#1a1a2e]" aria-hidden="true" />
            {t.form.submitting}
          </>
        ) : (
          <>
            {t.form.submit}
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-white/40">{t.form.privacyNote}</p>
    </form>
  )
}

export default LeadForm
