package ro.fitnessfreedom.backend.submission;

import java.util.Map;

import ro.fitnessfreedom.backend.submission.SubmissionRequest.Attribution;

record NewSubmission(long campaignId, long clientId, Map<String, Object> answers, String language,
                     Attribution attribution, String userAgent) {
}
