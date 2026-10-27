const E164_MAX_DIGITS = 15

export const normalizePhoneNumber = (raw: string) => raw.replace(/\D/g, '').replace(/^0+/, '')

export const isValidPhoneNumber = (dialCode: string, raw: string) => {
  const digits = normalizePhoneNumber(raw)
  return /^[1-9]\d{3,13}$/.test(digits) && dialCode.length - 1 + digits.length <= E164_MAX_DIGITS
}
