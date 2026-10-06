import { defineEnvVars } from "@sveltejs/kit/env"

export const variables = defineEnvVars({
  POSTGRES_DATABASE_URL: {},
  RENSHUU_API_READ_KEY: {},
  RENSHUU_API_READ_WRITE_KEY: {}
})
