import { redirect } from "@sveltejs/kit"
import { db } from "#lib/database/db-server.ts"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ url }) => {
  const any_existing_user = await db.query.profile.findFirst()
  const default_id = any_existing_user?.id

  if (!url.searchParams.has("id") && default_id) {
    redirect(307, `?id=${default_id}`)
  }

  const id = Number(url.searchParams.get("id")) || default_id

  return { id, default_id }
}
