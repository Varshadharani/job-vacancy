const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from .env

// Optional: log only safe config (remove this in production)
console.log("🔗 Connecting to DB:", {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  ssl: true,
});

// Create a new pool using either DATABASE_URL or individual PG_* vars
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
        ssl: {
          rejectUnauthorized: false,
        },
      }
);

module.exports = pool;
