package ro.fitnessfreedom.backend.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app")
public record AppProperties(Cors cors, Admin admin) {

    public record Cors(List<String> allowedOrigins) {
    }

    public record Admin(String apiKey) {
    }
}
