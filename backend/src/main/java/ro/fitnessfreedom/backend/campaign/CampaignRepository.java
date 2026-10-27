package ro.fitnessfreedom.backend.campaign;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class CampaignRepository {

    private final JdbcClient jdbc;

    CampaignRepository(JdbcClient jdbc) {
        this.jdbc = jdbc;
    }

    public long upsert(String slug) {
        return jdbc.sql("""
                        INSERT INTO campaign (slug) VALUES (:slug)
                        ON CONFLICT (slug) DO UPDATE SET slug = EXCLUDED.slug
                        RETURNING id
                        """)
                .param("slug", slug)
                .query(Long.class)
                .single();
    }

    public List<CampaignStats> findAllStats() {
        return jdbc.sql("""
                        SELECT c.slug,
                               count(s.id)                 AS submissions,
                               count(DISTINCT s.client_id) AS unique_clients,
                               c.created_at,
                               max(s.created_at)           AS last_submission_at
                        FROM campaign c
                        LEFT JOIN submission s ON s.campaign_id = c.id
                        GROUP BY c.id
                        ORDER BY last_submission_at DESC NULLS LAST
                        """)
                .query((rs, rowNum) -> new CampaignStats(
                        rs.getString("slug"),
                        rs.getLong("submissions"),
                        rs.getLong("unique_clients"),
                        rs.getObject("created_at", OffsetDateTime.class),
                        rs.getObject("last_submission_at", OffsetDateTime.class)))
                .list();
    }
}
