package ro.fitnessfreedom.backend.submission;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
class SubmissionController {

    private final SubmissionService service;

    SubmissionController(SubmissionService service) {
        this.service = service;
    }

    @PostMapping("/api/submissions")
    @ResponseStatus(HttpStatus.CREATED)
    SubmissionResponse submit(@Valid @RequestBody SubmissionRequest request,
                              @RequestHeader(value = HttpHeaders.USER_AGENT, required = false) String userAgent) {
        return new SubmissionResponse(service.submit(request, userAgent));
    }
}
