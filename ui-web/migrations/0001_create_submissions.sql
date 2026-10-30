CREATE TABLE submissions (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at   TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    campaign     TEXT    NOT NULL,
    full_name    TEXT    NOT NULL,
    phone        TEXT    NOT NULL,
    language     TEXT    NOT NULL,
    answers      TEXT    NOT NULL,
    source       TEXT    NOT NULL,
    utm_source   TEXT,
    utm_medium   TEXT,
    utm_campaign TEXT,
    utm_term     TEXT,
    utm_content  TEXT,
    gclid        TEXT,
    fbclid       TEXT,
    ttclid       TEXT,
    referrer     TEXT,
    landing_page TEXT,
    country      TEXT
);

CREATE INDEX submissions_campaign_created_at ON submissions (campaign, created_at);
CREATE INDEX submissions_phone ON submissions (phone);
