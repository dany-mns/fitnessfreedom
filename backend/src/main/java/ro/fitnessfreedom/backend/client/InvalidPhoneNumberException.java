package ro.fitnessfreedom.backend.client;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidPhoneNumberException extends ResponseStatusException {

    public InvalidPhoneNumberException() {
        super(HttpStatus.BAD_REQUEST, "Invalid phone number");
    }
}
