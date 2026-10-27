package ro.fitnessfreedom.backend.client;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class ClientRepository {

    private final JdbcClient jdbc;

    ClientRepository(JdbcClient jdbc) {
        this.jdbc = jdbc;
    }

    public long upsert(String fullName, PhoneNumber phone) {
        return jdbc.sql("""
                        INSERT INTO client (full_name, phone_country_code, phone_number, phone_e164)
                        VALUES (:fullName, :countryCode, :nationalNumber, :e164)
                        ON CONFLICT (phone_e164) DO UPDATE
                            SET full_name = EXCLUDED.full_name, updated_at = now()
                        RETURNING id
                        """)
                .param("fullName", fullName)
                .param("countryCode", phone.countryCode())
                .param("nationalNumber", phone.nationalNumber())
                .param("e164", phone.e164())
                .query(Long.class)
                .single();
    }
}
