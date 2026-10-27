package ro.fitnessfreedom.backend.submission;

import java.time.OffsetDateTime;

import ro.fitnessfreedom.backend.submission.SubmissionRequest.Attribution;
import tools.jackson.databind.JsonNode;

public record SubmissionView(long id, String fullName, String phone, JsonNode answers, String language,
                             Attribution attribution, OffsetDateTime createdAt) {
}
