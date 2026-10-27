FROM postgres:18.6-alpine

ENV POSTGRES_DB=fitnessfreedom \
    POSTGRES_USER=fitnessfreedom \
    POSTGRES_INITDB_ARGS="--encoding=UTF8 --locale-provider=icu --icu-locale=ro-RO"

HEALTHCHECK --interval=5s --timeout=5s --retries=10 \
    CMD pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" || exit 1

EXPOSE 5432
