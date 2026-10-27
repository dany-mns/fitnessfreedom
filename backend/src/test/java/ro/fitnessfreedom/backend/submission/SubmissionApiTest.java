package ro.fitnessfreedom.backend.submission;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

@SpringBootTest(properties = "app.admin.api-key=test-key")
@AutoConfigureMockMvc
@Testcontainers
class SubmissionApiTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:18.6-alpine");

    @Autowired
    MockMvc mvc;

    @Test
    void recordsSubmissionsPerCampaignAndDeduplicatesClientsByPhone() throws Exception {
        submit("""
                {"campaign":"christmas","fullName":"Ana Pop","phoneCountryCode":"+40","phoneNumber":"0722 123 456",
                 "answers":{"goal":"fat-loss"},"language":"ro","attribution":{"utmSource":"instagram"}}
                """);
        submit("""
                {"campaign":"christmas","fullName":"Ana Popescu","phoneCountryCode":"+40","phoneNumber":"722123456"}
                """);

        mvc.perform(get("/api/admin/campaigns").header("X-Admin-Key", "test-key"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].slug").value("christmas"))
                .andExpect(jsonPath("$[0].submissions").value(2))
                .andExpect(jsonPath("$[0].uniqueClients").value(1));

        mvc.perform(get("/api/admin/campaigns/christmas/submissions").header("X-Admin-Key", "test-key"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[1].phone").value("+40722123456"))
                .andExpect(jsonPath("$[1].answers.goal").value("fat-loss"))
                .andExpect(jsonPath("$[1].utmSource").value("instagram"));
    }

    @Test
    void rejectsInvalidPhoneNumber() throws Exception {
        mvc.perform(post("/api/submissions").contentType(MediaType.APPLICATION_JSON).content("""
                        {"campaign":"sixpack","fullName":"Ion","phoneCountryCode":"+40","phoneNumber":"12"}
                        """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void rejectsAdminRequestsWithoutKey() throws Exception {
        mvc.perform(get("/api/admin/campaigns")).andExpect(status().isUnauthorized());
    }

    private void submit(String body) throws Exception {
        mvc.perform(post("/api/submissions").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber());
    }
}
