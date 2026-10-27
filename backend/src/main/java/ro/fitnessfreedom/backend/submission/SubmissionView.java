package ro.fitnessfreedom.backend.submission;

import java.time.OffsetDateTime;

import tools.jackson.databind.JsonNode;

public record SubmissionView(long id, String fullName, String phone, JsonNode answers, String language,
                             String utmSource, String utmMedium, String utmCampaign, String referrer,
                             OffsetDateTime createdAt) {
}
