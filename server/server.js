const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres", // ✅ Fix typo: "postgress" -> "postgres"
  host: "localhost",
  database: "job_management",
  password: "Shanmugam@43",
  port: 5432,
});

// ✅ Test DB connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
  } else {
    console.log("✅ Connected to PostgreSQL database");
    release();
  }
});

// ✅ Fetch all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jobs ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Fetch single job by ID
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Add a new job
app.post("/api/jobs", async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      job_type,
      salary_range,
      description,
      requirements,
      responsibilities,
      application_deadline,
    } = req.body;

    if (!title || !company || !location || !job_type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      "INSERT INTO jobs (title, company, location, job_type, salary_range, description, requirements, responsibilities, application_deadline) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [title, company, location, job_type, salary_range, description, requirements, responsibilities, application_deadline]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Delete a job by ID
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM jobs WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
