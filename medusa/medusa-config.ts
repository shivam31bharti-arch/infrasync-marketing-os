import { defineConfig, loadEnv } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000,http://localhost:7001",
      authCors: process.env.AUTH_CORS || "http://localhost:3000,http://localhost:9000,http://localhost:7001",
      jwtSecret: process.env.JWT_SECRET || "dev-only-supersecret-change-me",
      cookieSecret: process.env.COOKIE_SECRET || "dev-only-supersecret-change-me",
    },
  },
  admin: {
    // admin dashboard served by `medusa develop` at http://localhost:9000/app
    disable: false,
  },
});
