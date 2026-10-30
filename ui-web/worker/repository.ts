import { trafficSource } from './source'
import type { ValidSubmission } from './submission'

const INSERT_SUBMISSION = `
  INSERT INTO submissions (
    campaign, full_name, phone, language, answers, source,
    utm_source, utm_medium, utm_campaign, utm_term, utm_content,
    gclid, fbclid, ttclid, referrer, landing_page, country
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  RETURNING id`

export const insertSubmission = (db: D1Database, submission: ValidSubmission, country: string | null) => {
  const { attribution } = submission
  return db
    .prepare(INSERT_SUBMISSION)
    .bind(
      submission.campaign,
      submission.fullName,
      submission.phone,
      submission.language,
      JSON.stringify(submission.answers),
      trafficSource(attribution),
      attribution.utmSource,
      attribution.utmMedium,
      attribution.utmCampaign,
      attribution.utmTerm,
      attribution.utmContent,
      attribution.gclid,
      attribution.fbclid,
      attribution.ttclid,
      attribution.referrer,
      attribution.landingPage,
      country,
    )
    .first<number>('id')
}
