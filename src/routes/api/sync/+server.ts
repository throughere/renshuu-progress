import { json } from "@sveltejs/kit"
import { sync } from "#lib/server/renshuu/sync.ts"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async () => {
  const result = await sync()
  return json(result)
}
