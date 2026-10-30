import { insertSubmission } from './repository'
import { parseSubmission } from './submission'
import { verifyTurnstile } from './turnstile'

const SUBMISSIONS_PATH = '/api/submissions'
const MAX_BODY_BYTES = 16 * 1024

const error = (code: string, status: number) => Response.json({ error: code }, { status })

const readJson = async (request: Request) => {
  const text = await request.text()
  if (text.length > MAX_BODY_BYTES) return null
  try {
    return JSON.parse(text) as unknown
  } catch {
    return null
  }
}

const handleSubmission = async (request: Request, env: Env) => {
  const clientIp = request.headers.get('CF-Connecting-IP')
  const { success: withinLimit } = await env.SUBMISSIONS_RATE_LIMITER.limit({ key: clientIp ?? 'unknown' })
  if (!withinLimit) return error('too_many_requests', 429)

  if (Number(request.headers.get('Content-Length') ?? 0) > MAX_BODY_BYTES) return error('payload_too_large', 413)

  const submission = parseSubmission(await readJson(request))
  if (!submission) return error('invalid_submission', 400)

  const verified = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, submission.turnstileToken, clientIp)
  if (!verified) return error('verification_failed', 403)

  const country = typeof request.cf?.country === 'string' ? request.cf.country : null
  const id = await insertSubmission(env.DB, submission, country)
  return Response.json({ id }, { status: 201 })
}

export default {
  fetch(request, env) {
    const { pathname } = new URL(request.url)
    if (pathname !== SUBMISSIONS_PATH) return error('not_found', 404)
    if (request.method !== 'POST') return error('method_not_allowed', 405)
    return handleSubmission(request, env)
  },
} satisfies ExportedHandler<Env>
