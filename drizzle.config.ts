import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  out: `migrations`,
  casing: "snake_case",
  schema: `${__dirname}/src/db/schema.ts`,
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    prefix: "timestamp",
  },
  verbose: true,
});
