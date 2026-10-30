const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

interface SiteverifyResult {
  success: boolean
}

export const verifyTurnstile = async (secret: string, token: string, remoteIp: string | null) => {
  const body = new URLSearchParams({ secret, response: token })
  if (remoteIp) body.set('remoteip', remoteIp)

  const response = await fetch(SITEVERIFY_URL, { method: 'POST', body })
  if (!response.ok) return false
  const result = await response.json<SiteverifyResult>()
  return result.success
}
