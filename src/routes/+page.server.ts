import { db } from "#lib/database/db-server.ts"
import { profile } from "#lib/database/schema/index.ts"
import type { PageServerLoad } from "./$types"
import { RENSHUU_API_READ_KEY } from "$app/env/private"

const getData = async () => {
  const url = "https://api.renshuu.org/v1/profile";
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${RENSHUU_API_READ_KEY}` }
  });
  return await response.json()
}

export const load: PageServerLoad = async () => {
  const profiles = await db.select().from(profile)
  const renshuu = await getData();
  return { profiles, renshuu }
}


