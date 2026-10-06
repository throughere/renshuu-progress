export function getDbUrl() {
  const dbUrl = process.env.POSTGRES_DATABASE_URL;

  if (dbUrl) {
    return dbUrl
  }
  if (!dbUrl) {
    throw new Error("No database url found")
  }
}

