package ro.fitnessfreedom.backend.campaign;

import java.time.OffsetDateTime;

public record CampaignStats(String slug, long submissions, long uniqueClients, OffsetDateTime createdAt,
                            OffsetDateTime lastSubmissionAt) {
}
