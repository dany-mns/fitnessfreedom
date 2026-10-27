package ro.fitnessfreedom.backend.client;

import java.util.regex.Pattern;

public record PhoneNumber(String countryCode, String nationalNumber) {

    private static final Pattern COUNTRY_CODE = Pattern.compile("\\+[1-9]\\d{0,3}");
    private static final Pattern NATIONAL_NUMBER = Pattern.compile("[1-9]\\d{3,13}");
    private static final int E164_MAX_DIGITS = 15;

    public PhoneNumber {
        if (!COUNTRY_CODE.matcher(countryCode).matches()
                || !NATIONAL_NUMBER.matcher(nationalNumber).matches()
                || countryCode.length() - 1 + nationalNumber.length() > E164_MAX_DIGITS) {
            throw new InvalidPhoneNumberException();
        }
    }

    public static PhoneNumber parse(String countryCode, String rawNumber) {
        String digits = rawNumber.replaceAll("\\D", "").replaceFirst("^0+", "");
        return new PhoneNumber(countryCode.trim(), digits);
    }

    public String e164() {
        return countryCode + nationalNumber;
    }
}
