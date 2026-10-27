import { useMemo } from 'react'
import { countries, DEFAULT_COUNTRY_ISO, flagEmoji, type Country } from '../../config/countries'
import type { Language } from '../../i18n'
import { ChevronIcon } from '../icons'

interface PhoneInputProps {
  language: Language
  country: Country
  number: string
  countryLabel: string
  placeholder: string
  labelId: string
  errorId: string
  hasError: boolean
  onCountryChange: (country: Country) => void
  onNumberChange: (value: string) => void
  onBlur: () => void
}

const useSortedCountries = (language: Language) =>
  useMemo(() => {
    const regionNames = new Intl.DisplayNames([language], { type: 'region' })
    return countries
      .map((country) => ({ ...country, name: regionNames.of(country.iso) ?? country.iso }))
      .sort((a, b) =>
        a.iso === DEFAULT_COUNTRY_ISO ? -1 : b.iso === DEFAULT_COUNTRY_ISO ? 1 : a.name.localeCompare(b.name, language),
      )
  }, [language])

const PhoneInput = ({
  language,
  country,
  number,
  countryLabel,
  placeholder,
  labelId,
  errorId,
  hasError,
  onCountryChange,
  onNumberChange,
  onBlur,
}: PhoneInputProps) => {
  const sortedCountries = useSortedCountries(language)

  return (
    <div
      className={`flex overflow-hidden rounded-xl border bg-white/[0.04] transition-colors focus-within:bg-white/[0.07] ${
        hasError ? 'border-red-400/60 focus-within:border-red-400' : 'border-white/10 hover:border-white/20 focus-within:border-primary'
      }`}
    >
      <div className="relative flex shrink-0 items-center gap-2 border-r border-white/10 pl-4 pr-3 hover:bg-white/[0.04]">
        <span aria-hidden="true" className="text-xl leading-none">{flagEmoji(country.iso)}</span>
        <span aria-hidden="true" className="font-medium text-white tabular-nums">{country.dialCode}</span>
        <ChevronIcon />
        <select
          aria-label={countryLabel}
          value={country.iso}
          onChange={(event) => onCountryChange(countries.find((option) => option.iso === event.target.value)!)}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {sortedCountries.map((option) => (
            <option key={option.iso} value={option.iso} className="bg-ink">
              {flagEmoji(option.iso)} {option.name} ({option.dialCode})
            </option>
          ))}
        </select>
      </div>
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={number}
        placeholder={placeholder}
        aria-labelledby={labelId}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        onChange={(event) => onNumberChange(event.target.value)}
        onBlur={onBlur}
        className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-white tabular-nums placeholder:text-white/30 outline-none"
      />
    </div>
  )
}

export default PhoneInput
