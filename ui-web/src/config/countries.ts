export interface Country {
  iso: string
  dialCode: string
}

export const DEFAULT_COUNTRY_ISO = 'RO'

export const countries: Country[] = [
  { iso: 'RO', dialCode: '+40' },
  { iso: 'MD', dialCode: '+373' },
  { iso: 'AT', dialCode: '+43' },
  { iso: 'BE', dialCode: '+32' },
  { iso: 'BG', dialCode: '+359' },
  { iso: 'CA', dialCode: '+1' },
  { iso: 'CH', dialCode: '+41' },
  { iso: 'CY', dialCode: '+357' },
  { iso: 'CZ', dialCode: '+420' },
  { iso: 'DE', dialCode: '+49' },
  { iso: 'DK', dialCode: '+45' },
  { iso: 'AE', dialCode: '+971' },
  { iso: 'ES', dialCode: '+34' },
  { iso: 'FI', dialCode: '+358' },
  { iso: 'FR', dialCode: '+33' },
  { iso: 'GB', dialCode: '+44' },
  { iso: 'GR', dialCode: '+30' },
  { iso: 'HU', dialCode: '+36' },
  { iso: 'IE', dialCode: '+353' },
  { iso: 'IL', dialCode: '+972' },
  { iso: 'IT', dialCode: '+39' },
  { iso: 'NL', dialCode: '+31' },
  { iso: 'NO', dialCode: '+47' },
  { iso: 'PL', dialCode: '+48' },
  { iso: 'PT', dialCode: '+351' },
  { iso: 'RS', dialCode: '+381' },
  { iso: 'SE', dialCode: '+46' },
  { iso: 'TR', dialCode: '+90' },
  { iso: 'UA', dialCode: '+380' },
  { iso: 'US', dialCode: '+1' },
]

export const flagEmoji = (iso: string) =>
  String.fromCodePoint(...[...iso.toUpperCase()].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65))
