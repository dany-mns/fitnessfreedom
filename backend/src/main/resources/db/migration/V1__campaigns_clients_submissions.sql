CREATE TABLE campaign (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug       VARCHAR(64) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE client (
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name          VARCHAR(120) NOT NULL,
    phone_country_code VARCHAR(5)   NOT NULL,
    phone_number       VARCHAR(15)  NOT NULL,
    phone_e164         VARCHAR(16)  NOT NULL UNIQUE,
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE submission (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    campaign_id  BIGINT       NOT NULL REFERENCES campaign (id),
    client_id    BIGINT       NOT NULL REFERENCES client (id),
    answers      JSONB        NOT NULL DEFAULT '{}'::jsonb,
    language     VARCHAR(5),
    utm_source   VARCHAR(100),
    utm_medium   VARCHAR(100),
    utm_campaign VARCHAR(100),
    referrer     VARCHAR(500),
    user_agent   VARCHAR(500),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX submission_campaign_created_idx ON submission (campaign_id, created_at DESC);
CREATE INDEX submission_client_idx ON submission (client_id);
