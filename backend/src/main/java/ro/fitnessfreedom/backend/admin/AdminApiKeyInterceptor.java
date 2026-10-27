package ro.fitnessfreedom.backend.admin;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AdminApiKeyInterceptor implements HandlerInterceptor {

    static final String HEADER = "X-Admin-Key";

    private final byte[] expectedKey;

    public AdminApiKeyInterceptor(String apiKey) {
        this.expectedKey = apiKey == null ? new byte[0] : apiKey.getBytes(StandardCharsets.UTF_8);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (expectedKey.length == 0 || !matches(request.getHeader(HEADER))) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        return true;
    }

    private boolean matches(String providedKey) {
        return providedKey != null && MessageDigest.isEqual(expectedKey, providedKey.getBytes(StandardCharsets.UTF_8));
    }
}
