package ro.fitnessfreedom.backend.admin;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import ro.fitnessfreedom.backend.campaign.CampaignRepository;
import ro.fitnessfreedom.backend.campaign.CampaignStats;
import ro.fitnessfreedom.backend.submission.SubmissionRepository;
import ro.fitnessfreedom.backend.submission.SubmissionView;

@RestController
@RequestMapping("/api/admin/campaigns")
@Validated
class AdminController {

    private final CampaignRepository campaigns;
    private final SubmissionRepository submissions;

    AdminController(CampaignRepository campaigns, SubmissionRepository submissions) {
        this.campaigns = campaigns;
        this.submissions = submissions;
    }

    @GetMapping
    List<CampaignStats> campaigns() {
        return campaigns.findAllStats();
    }

    @GetMapping("/{slug}/submissions")
    List<SubmissionView> submissions(@PathVariable String slug,
                                     @RequestParam(defaultValue = "100") @Min(1) @Max(1000) int limit) {
        return submissions.findLatestByCampaign(slug, limit);
    }
}
