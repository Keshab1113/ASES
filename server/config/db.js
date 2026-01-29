const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 50,
  waitForConnections: true,
  queueLimit: 100,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  connectTimeout: 20000,
  acquireTimeout: 20000,
  timeout: 60000,
  dateStrings: true,
  timezone: "Z",
  multipleStatements: false,
  namedPlaceholders: false,
  charset: "utf8mb4",
});

pool.on("connection", (connection) => {
  console.log("✅ New database connection established:", connection.threadId);
});

pool.on("acquire", (connection) => {
  console.log("📊 Connection %d acquired", connection.threadId);
});

pool.on("release", (connection) => {
  console.log("📤 Connection %d released", connection.threadId);
});

pool.on("enqueue", () => {
  console.log("⏳ Waiting for available connection slot");
});

// ✅ Graceful shutdown handler
process.on("SIGINT", async () => {
  console.log("\n🔴 Closing database connection pool...");
  try {
    await pool.end();
    console.log("✅ Database connection pool closed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error closing database pool:", err);
    process.exit(1);
  }
});

// ✅ Test connection on startup
const testConnection = async () => {
  try {
    const connection = await pool.promise().getConnection();
    console.log("✅ Database connection test successful");
    connection.release();
  } catch (err) {
    console.error("❌ Database connection test failed:", err);
    throw err;
  }
};

// Run test connection
testConnection();

// ✅ Export promisified pool
const promisePool = pool.promise();

// ✅ Add helper method to check pool status
promisePool.getPoolStatus = () => {
  return {
    totalConnections: pool._allConnections.length,
    freeConnections: pool._freeConnections.length,
    queueLength: pool._connectionQueue.length,
  };
};

module.exports = promisePool;
