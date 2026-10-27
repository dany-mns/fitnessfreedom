package ro.fitnessfreedom.backend.submission;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import tools.jackson.databind.json.JsonMapper;

@Repository
public class SubmissionRepository {

    private static final int USER_AGENT_MAX_LENGTH = 500;

    private final JdbcClient jdbc;
    private final JsonMapper jsonMapper;

    SubmissionRepository(JdbcClient jdbc, JsonMapper jsonMapper) {
        this.jdbc = jdbc;
        this.jsonMapper = jsonMapper;
    }

    long insert(NewSubmission submission) {
        var attribution = submission.attribution();
        return jdbc.sql("""
                        INSERT INTO submission (campaign_id, client_id, answers, language,
                                                utm_source, utm_medium, utm_campaign, referrer, user_agent)
                        VALUES (:campaignId, :clientId, CAST(:answers AS jsonb), :language,
                                :utmSource, :utmMedium, :utmCampaign, :referrer, :userAgent)
                        RETURNING id
                        """)
                .param("campaignId", submission.campaignId())
                .param("clientId", submission.clientId())
                .param("answers", jsonMapper.writeValueAsString(submission.answers()))
                .param("language", submission.language())
                .param("utmSource", attribution.utmSource())
                .param("utmMedium", attribution.utmMedium())
                .param("utmCampaign", attribution.utmCampaign())
                .param("referrer", attribution.referrer())
                .param("userAgent", truncate(submission.userAgent()))
                .query(Long.class)
                .single();
    }

    public List<SubmissionView> findLatestByCampaign(String campaignSlug, int limit) {
        return jdbc.sql("""
                        SELECT s.id, cl.full_name, cl.phone_e164, s.answers::text AS answers, s.language,
                               s.utm_source, s.utm_medium, s.utm_campaign, s.referrer, s.created_at
                        FROM submission s
                        JOIN campaign c ON c.id = s.campaign_id
                        JOIN client cl ON cl.id = s.client_id
                        WHERE c.slug = :slug
                        ORDER BY s.created_at DESC
                        LIMIT :limit
                        """)
                .param("slug", campaignSlug)
                .param("limit", limit)
                .query((rs, rowNum) -> new SubmissionView(
                        rs.getLong("id"),
                        rs.getString("full_name"),
                        rs.getString("phone_e164"),
                        jsonMapper.readTree(rs.getString("answers")),
                        rs.getString("language"),
                        rs.getString("utm_source"),
                        rs.getString("utm_medium"),
                        rs.getString("utm_campaign"),
                        rs.getString("referrer"),
                        rs.getObject("created_at", OffsetDateTime.class)))
                .list();
    }

    private static String truncate(String value) {
        return value == null || value.length() <= USER_AGENT_MAX_LENGTH ? value : value.substring(0, USER_AGENT_MAX_LENGTH);
    }
}
