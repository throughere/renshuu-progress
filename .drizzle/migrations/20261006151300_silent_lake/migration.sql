CREATE TABLE "profile" (
	"id" integer PRIMARY KEY,
	"name" varchar(30),
	"adventure_level" integer,
	"kao" text,
	"today_all" integer,
	"today_vocab" integer,
	"today_kanji" integer,
	"today_grammar" integer,
	"today_sent" integer,
	"today_conj" integer,
	"today_aconj" integer,
	"total" integer,
	"total_vocab" integer,
	"total_kanji" integer,
	"total_grammar" integer,
	"total_sent" integer
);
--> statement-breakpoint
CREATE TABLE "level_progress" (
	"profile_id" integer,
	"category" varchar(10),
	"level" varchar(10),
	"percent" smallint NOT NULL,
	CONSTRAINT "level_progress_pkey" PRIMARY KEY("profile_id","category","level"),
	CONSTRAINT "level_progress_percent_check" CHECK ("percent" BETWEEN 0 AND 100)
);
--> statement-breakpoint
CREATE TABLE "streak" (
	"profile_id" integer,
	"category" varchar(10),
	"correct_in_a_row" integer NOT NULL,
	"correct_in_a_row_alltime" integer NOT NULL,
	"days_studied_in_a_row" integer NOT NULL,
	"days_studied_in_a_row_alltime" integer NOT NULL,
	CONSTRAINT "streak_pkey" PRIMARY KEY("profile_id","category")
);
--> statement-breakpoint
ALTER TABLE "level_progress" ADD CONSTRAINT "level_progress_profile_id_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "streak" ADD CONSTRAINT "streak_profile_id_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE;