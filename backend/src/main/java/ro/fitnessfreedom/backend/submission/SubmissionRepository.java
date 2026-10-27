package ro.fitnessfreedom.backend.submission;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import ro.fitnessfreedom.backend.submission.SubmissionRequest.Attribution;
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
                                                utm_source, utm_medium, utm_campaign, utm_term, utm_content,
                                                gclid, fbclid, ttclid, referrer, landing_page, user_agent)
                        VALUES (:campaignId, :clientId, CAST(:answers AS jsonb), :language,
                                :utmSource, :utmMedium, :utmCampaign, :utmTerm, :utmContent,
                                :gclid, :fbclid, :ttclid, :referrer, :landingPage, :userAgent)
                        RETURNING id
                        """)
                .param("campaignId", submission.campaignId())
                .param("clientId", submission.clientId())
                .param("answers", jsonMapper.writeValueAsString(submission.answers()))
                .param("language", submission.language())
                .param("utmSource", attribution.utmSource())
                .param("utmMedium", attribution.utmMedium())
                .param("utmCampaign", attribution.utmCampaign())
                .param("utmTerm", attribution.utmTerm())
                .param("utmContent", attribution.utmContent())
                .param("gclid", attribution.gclid())
                .param("fbclid", attribution.fbclid())
                .param("ttclid", attribution.ttclid())
                .param("referrer", attribution.referrer())
                .param("landingPage", attribution.landingPage())
                .param("userAgent", truncate(submission.userAgent()))
                .query(Long.class)
                .single();
    }

    public List<SubmissionView> findLatestByCampaign(String campaignSlug, int limit) {
        return jdbc.sql("""
                        SELECT s.id, cl.full_name, cl.phone_e164, s.answers::text AS answers, s.language,
                               s.utm_source, s.utm_medium, s.utm_campaign, s.utm_term, s.utm_content,
                               s.gclid, s.fbclid, s.ttclid, s.referrer, s.landing_page, s.created_at
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
                        new Attribution(
                                rs.getString("utm_source"),
                                rs.getString("utm_medium"),
                                rs.getString("utm_campaign"),
                                rs.getString("utm_term"),
                                rs.getString("utm_content"),
                                rs.getString("gclid"),
                                rs.getString("fbclid"),
                                rs.getString("ttclid"),
                                rs.getString("referrer"),
                                rs.getString("landing_page")),
                        rs.getObject("created_at", OffsetDateTime.class)))
                .list();
    }

    public List<SourceStats> countBySource(String campaignSlug) {
        return jdbc.sql("""
                        SELECT coalesce(
                                       s.utm_source,
                                       CASE
                                           WHEN s.gclid IS NOT NULL THEN 'google'
                                           WHEN s.fbclid IS NOT NULL THEN 'facebook'
                                           WHEN s.ttclid IS NOT NULL THEN 'tiktok'
                                       END,
                                       substring(s.referrer FROM '^https?://(?:www\\.)?([^/:?#]+)'),
                                       'direct')       AS source,
                               s.utm_medium            AS medium,
                               count(*)                AS submissions,
                               count(DISTINCT s.client_id) AS unique_clients
                        FROM submission s
                        JOIN campaign c ON c.id = s.campaign_id
                        WHERE c.slug = :slug
                        GROUP BY 1, 2
                        ORDER BY submissions DESC
                        """)
                .param("slug", campaignSlug)
                .query((rs, rowNum) -> new SourceStats(
                        rs.getString("source"),
                        rs.getString("medium"),
                        rs.getLong("submissions"),
                        rs.getLong("unique_clients")))
                .list();
    }

    private static String truncate(String value) {
        return value == null || value.length() <= USER_AGENT_MAX_LENGTH ? value : value.substring(0, USER_AGENT_MAX_LENGTH);
    }
}
