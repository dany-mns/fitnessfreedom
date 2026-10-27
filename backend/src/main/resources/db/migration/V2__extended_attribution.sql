ALTER TABLE submission
    ALTER COLUMN utm_source TYPE VARCHAR(255),
    ALTER COLUMN utm_medium TYPE VARCHAR(255),
    ALTER COLUMN utm_campaign TYPE VARCHAR(255),
    ADD COLUMN utm_term     VARCHAR(255),
    ADD COLUMN utm_content  VARCHAR(255),
    ADD COLUMN gclid        VARCHAR(255),
    ADD COLUMN fbclid       VARCHAR(255),
    ADD COLUMN ttclid       VARCHAR(255),
    ADD COLUMN landing_page VARCHAR(500);
