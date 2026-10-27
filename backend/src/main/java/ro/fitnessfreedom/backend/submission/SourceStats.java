package ro.fitnessfreedom.backend.submission;

public record SourceStats(String source, String medium, long submissions, long uniqueClients) {
}
