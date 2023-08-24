CREATE TABLE "Languages" (
  "id" VARCHAR(5) PRIMARY KEY,
  "name" VARCHAR(255),
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "Texts" (
  "id" VARCHAR(32) PRIMARY KEY,
  "title" VARCHAR(255),
  "content" TEXT,
  "audio_url" VARCHAR(500),
  "created_at" timestamp,
  "updated_at" timestamp,
  "language_id" VARCHAR(5)
);

CREATE TABLE "Translations" (
  "id" SERIAL PRIMARY KEY,
  "text_id" VARCHAR(32),
  "language_id" VARCHAR(5),
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "Texts" ADD FOREIGN KEY ("language_id") REFERENCES "Languages" ("id");

ALTER TABLE "Translations" ADD FOREIGN KEY ("text_id") REFERENCES "Texts" ("id");

ALTER TABLE "Translations" ADD FOREIGN KEY ("language_id") REFERENCES "Languages" ("id");