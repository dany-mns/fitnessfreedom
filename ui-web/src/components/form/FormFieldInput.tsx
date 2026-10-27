import type { AnswerValue } from '../../api/submissions'
import type { ChoiceField, FormField } from '../../config/forms'
import type { Language } from '../../i18n'
import { fieldClass } from './fieldClass'
import { CheckIcon, ChevronIcon } from '../icons'

interface FormFieldInputProps {
  field: FormField
  value: AnswerValue | undefined
  language: Language
  selectPlaceholder: string
  labelId: string
  errorId: string
  hasError: boolean
  onChange: (value: AnswerValue) => void
  onBlur: () => void
}

const toggleValue = (selected: string[], value: string) =>
  selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]

const ChoiceGroup = ({ field, value, language, labelId, errorId, hasError, onChange, onBlur }: FormFieldInputProps & { field: ChoiceField }) => {
  const multiple = field.type === 'checkbox'
  const selected = Array.isArray(value) ? value : value ? [value] : []

  return (
    <div
      role={multiple ? 'group' : 'radiogroup'}
      aria-labelledby={labelId}
      aria-describedby={hasError ? errorId : undefined}
      className="grid gap-3 sm:grid-cols-2"
    >
      {field.options.map((option) => (
        <label
          key={option.value}
          className="group flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 px-4 py-3.5 text-white/75 transition-colors hover:border-white/25 has-checked:border-primary/70 has-checked:text-white has-focus-visible:ring-2 has-focus-visible:ring-primary/50"
        >
          <input
            type={multiple ? 'checkbox' : 'radio'}
            name={field.id}
            value={option.value}
            checked={selected.includes(option.value)}
            onChange={() => onChange(multiple ? toggleValue(selected, option.value) : option.value)}
            onBlur={onBlur}
            className="peer sr-only"
          />
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 border-white/30 text-ink transition-colors peer-checked:border-primary peer-checked:bg-primary ${
              multiple ? 'rounded-md' : 'rounded-full'
            }`}
          >
            <CheckIcon className="h-3 w-3 opacity-0 group-has-checked:opacity-100" />
          </span>
          <span className="font-medium">{option.label[language]}</span>
        </label>
      ))}
    </div>
  )
}

const FormFieldInput = (props: FormFieldInputProps) => {
  const { field, value, language, selectPlaceholder, labelId, errorId, hasError, onChange, onBlur } = props
  const inputProps = {
    'aria-labelledby': labelId,
    'aria-invalid': hasError,
    'aria-describedby': hasError ? errorId : undefined,
    onBlur,
  }

  switch (field.type) {
    case 'radio':
    case 'checkbox':
      return <ChoiceGroup {...props} field={field} />
    case 'select':
      return (
        <div className="relative">
          <select
            {...inputProps}
            value={typeof value === 'string' ? value : ''}
            onChange={(event) => onChange(event.target.value)}
            className={`${fieldClass(hasError)} cursor-pointer appearance-none pr-10 ${value ? '' : 'text-white/30'}`}
          >
            <option value="" disabled className="bg-ink">{selectPlaceholder}</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value} className="bg-ink text-white">
                {option.label[language]}
              </option>
            ))}
          </select>
          <ChevronIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      )
    case 'textarea':
      return (
        <textarea
          {...inputProps}
          rows={4}
          value={typeof value === 'string' ? value : ''}
          placeholder={field.placeholder?.[language]}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldClass(hasError)} resize-y`}
        />
      )
    default:
      return (
        <input
          {...inputProps}
          type={field.type}
          value={typeof value === 'string' ? value : ''}
          placeholder={field.placeholder?.[language]}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass(hasError)}
        />
      )
  }
}

export default FormFieldInput
