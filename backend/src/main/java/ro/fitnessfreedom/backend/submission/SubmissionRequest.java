package ro.fitnessfreedom.backend.submission;

import java.util.Map;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SubmissionRequest(
        @NotBlank @Pattern(regexp = "[a-z0-9]+(-[a-z0-9]+)*") @Size(max = 64) String campaign,
        @NotBlank @Size(min = 2, max = 120) String fullName,
        @NotBlank @Size(max = 5) String phoneCountryCode,
        @NotBlank @Size(max = 25) String phoneNumber,
        @Size(max = 50) Map<@Size(max = 64) String, Object> answers,
        @Pattern(regexp = "[a-z]{2}") String language,
        @Valid Attribution attribution) {

    public record Attribution(
            @Size(max = 100) String utmSource,
            @Size(max = 100) String utmMedium,
            @Size(max = 100) String utmCampaign,
            @Size(max = 500) String referrer) {

        static final Attribution NONE = new Attribution(null, null, null, null);
    }
}
