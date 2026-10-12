import { error } from "@sveltejs/kit";
import { and, eq, getColumns, sql } from "drizzle-orm";
import { db } from "#lib/database/db-server.ts";
import { kanjiTerm } from "#lib/database/schema/kanji-term.ts";
import { studyVector } from "#lib/database/schema/study-vector.ts";
import type { PageServerLoad } from "./$types";

const term_types = ["vocab", "kanji", "grammar", "sent"] as const;
type TermType = (typeof term_types)[number];

const isTermType = (value: string): value is TermType =>
  term_types.includes(value as TermType);

// Making sure that non jlpt goes last
const jlpt_order = sql`case ${kanjiTerm.jlpt}
  when 'N5' then 1
  when 'N4' then 2
  when 'N3' then 3
  when 'N2' then 4
  when 'N1' then 5
  else 6
end`;

// Calculated active mastery (only studied vactors) 
const active_mastery = sql<number>`coalesce(round(avg(${studyVector.mastery_perc}) filter (where ${studyVector.mastery_perc} <> 0)), 0)::int`;

export const load: PageServerLoad = async ({ parent, params }) => {
  const { id } = await parent();
  if (id === undefined) error(404, "No profile found");
  if (!isTermType(params.type)) error(404, "Unknown term type");

  if (params.type !== "kanji") {
    return { type: params.type, kanji_by_level: [] };
  }

  const kanjis = await db
    .select({ ...getColumns(kanjiTerm), active_mastery })
    .from(kanjiTerm)
    .leftJoin(
      studyVector,
      and(
        eq(studyVector.profile_id, kanjiTerm.profile_id),
        eq(studyVector.termtype, "kanji"),
        eq(studyVector.term_id, kanjiTerm.id),
      ),
    )
    .where(eq(kanjiTerm.profile_id, id))
    .groupBy(kanjiTerm.profile_id, kanjiTerm.id)
    .orderBy(jlpt_order, kanjiTerm.jlpt, kanjiTerm.id);

  const kanji_by_level = [...Map.groupBy(kanjis, (kanji) => kanji.jlpt)];
  return { type: params.type, kanji_by_level };
};
