package ro.fitnessfreedom.backend.submission;

import java.util.Map;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fitnessfreedom.backend.campaign.CampaignRepository;
import ro.fitnessfreedom.backend.client.ClientRepository;
import ro.fitnessfreedom.backend.client.PhoneNumber;
import ro.fitnessfreedom.backend.submission.SubmissionRequest.Attribution;

@Service
class SubmissionService {

    private final CampaignRepository campaigns;
    private final ClientRepository clients;
    private final SubmissionRepository submissions;

    SubmissionService(CampaignRepository campaigns, ClientRepository clients, SubmissionRepository submissions) {
        this.campaigns = campaigns;
        this.clients = clients;
        this.submissions = submissions;
    }

    @Transactional
    long submit(SubmissionRequest request, String userAgent) {
        var phone = PhoneNumber.parse(request.phoneCountryCode(), request.phoneNumber());
        long campaignId = campaigns.upsert(request.campaign());
        long clientId = clients.upsert(request.fullName().trim(), phone);
        return submissions.insert(new NewSubmission(
                campaignId,
                clientId,
                Objects.requireNonNullElse(request.answers(), Map.of()),
                request.language(),
                Objects.requireNonNullElse(request.attribution(), Attribution.NONE),
                userAgent));
    }
}
