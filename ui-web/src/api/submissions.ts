import type { SubmissionPayload } from './payload'

export const submitForm = async (payload: SubmissionPayload) => {
  const response = await fetch('/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(`Submission failed with status ${response.status}`)
  }
}
