CREATE TABLE "vocab_term" (
	"profile_id" integer,
	"id" integer,
	"kanji_full" text NOT NULL,
	"hiragana_full" text NOT NULL,
	"typeofspeech" text NOT NULL,
	"def" text[] NOT NULL,
	"pitch" text[] NOT NULL,
	"correct_count" integer NOT NULL,
	"missed_count" integer NOT NULL,
	"mastery_avg_perc" smallint NOT NULL,
	CONSTRAINT "vocab_term_pkey" PRIMARY KEY("profile_id","id")
);
--> statement-breakpoint
CREATE TABLE "kanji_term" (
	"profile_id" integer,
	"id" integer,
	"kanji" text NOT NULL,
	"scount" smallint NOT NULL,
	"definition" text NOT NULL,
	"onyomi" text NOT NULL,
	"kunyomi" text NOT NULL,
	"kanken" varchar(10) NOT NULL,
	"jlpt" varchar(5) NOT NULL,
	"radical" text NOT NULL,
	"radical_name" text NOT NULL,
	"correct_count" integer NOT NULL,
	"missed_count" integer NOT NULL,
	"mastery_avg_perc" smallint NOT NULL,
	CONSTRAINT "kanji_term_pkey" PRIMARY KEY("profile_id","id")
);
--> statement-breakpoint
CREATE TABLE "grammar_term" (
	"profile_id" integer,
	"id" integer,
	"title_english" text NOT NULL,
	"title_japanese" text NOT NULL,
	"meaning" text NOT NULL,
	"meaning_long" text NOT NULL,
	"url" text NOT NULL,
	"correct_count" integer NOT NULL,
	"missed_count" integer NOT NULL,
	"mastery_avg_perc" smallint NOT NULL,
	CONSTRAINT "grammar_term_pkey" PRIMARY KEY("profile_id","id")
);
--> statement-breakpoint
CREATE TABLE "sentence_term" (
	"profile_id" integer,
	"id" integer,
	"japanese" text NOT NULL,
	"meaning" text NOT NULL,
	"correct_count" integer NOT NULL,
	"missed_count" integer NOT NULL,
	"mastery_avg_perc" smallint NOT NULL,
	CONSTRAINT "sentence_term_pkey" PRIMARY KEY("profile_id","id")
);
--> statement-breakpoint
CREATE TABLE "study_vector" (
	"profile_id" integer,
	"termtype" varchar(10),
	"term_id" integer,
	"name" varchar(30),
	"correct_count" integer NOT NULL,
	"missed_count" integer NOT NULL,
	"mastery_perc" smallint NOT NULL,
	"last_quizzed" date,
	"next_quiz" date,
	CONSTRAINT "study_vector_pkey" PRIMARY KEY("profile_id","termtype","term_id","name")
);
--> statement-breakpoint
ALTER TABLE "vocab_term" ADD CONSTRAINT "vocab_term_profile_id_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "kanji_term" ADD CONSTRAINT "kanji_term_profile_id_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "grammar_term" ADD CONSTRAINT "grammar_term_profile_id_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "sentence_term" ADD CONSTRAINT "sentence_term_profile_id_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "study_vector" ADD CONSTRAINT "study_vector_profile_id_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE;