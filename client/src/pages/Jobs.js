import React, { useContext, useEffect, useState } from "react";
import JobCard from "../components/JobCards";
import { Container, Row, Col, Spinner, Alert, Form } from "react-bootstrap";
import axios from "axios";
import { JobContext } from "../context/JobContext";


const Jobs = () => {
  const { jobs, setJobs } = useContext(JobContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "",
    salary: ""
  });

  useEffect(() => {
    axios
      .get("https://job-api-4lhs.onrender.com/api/jobs")
      .then((response) => {
        console.log("✅ Jobs fetched:", response.data);
        if (Array.isArray(response.data)) {
          setJobs(response.data);
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching jobs, loading mock data:", err);
  
        // ✅ Load mock data
        const mockJobs = [
          {
            id: 1,
            title: "Frontend Developer",
            company: "TechNova",
            location: "Bangalore",
            job_type: "full-time",
            salary_range: "₹8 - ₹12 LPA",
            description: "React-based UI development.",
          },
          {
            id: 2,
            title: "Backend Engineer",
            company: "CodeVerse",
            location: "Chennai",
            job_type: "full-time",
            salary_range: "₹10 - ₹15 LPA",
            description: "Build scalable APIs with Node.js.",
          },
          {
            id: 3,
            title: "UI/UX Designer",
            company: "PixelCraft",
            location: "Remote",
            job_type: "contract",
            salary_range: "₹6 - ₹10 LPA",
            description: "Design clean and intuitive UI.",
          },
          {
            id: 4,
            title: "DevOps Engineer",
            company: "DeployIT",
            location: "Mumbai",
            job_type: "full-time",
            salary_range: "₹14 - ₹20 LPA",
            description: "Manage infrastructure and CI/CD pipelines.",
          },
          {
            id: 5,
            title: "Full Stack Developer",
            company: "BrightSoft",
            location: "Hyderabad",
            job_type: "full-time",
            salary_range: "₹12 - ₹18 LPA",
            description: "React + Node stack, building dashboards.",
          },
          {
            id: 6,
            title: "Mobile Developer",
            company: "AppNest",
            location: "Pune",
            job_type: "internship",
            salary_range: "₹4 - ₹8 LPA",
            description: "Work on Android and iOS apps.",
          },
          {
            id: 7,
            title: "QA Tester",
            company: "Testify",
            location: "Kolkata",
            job_type: "part-time",
            salary_range: "₹5 - ₹9 LPA",
            description: "Manual and automation testing.",
          },
          {
            id: 8,
            title: "Data Analyst",
            company: "InsightX",
            location: "Delhi",
            job_type: "full-time",
            salary_range: "₹10 - ₹14 LPA",
            description: "Work with large datasets and visualizations.",
          }
        ];
  
        setJobs(mockJobs);
        setError("Failed to load from server. Showing mock data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setJobs]);
  

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = Array.isArray(jobs)
    ? jobs.filter((job) => {
        return (
          (job.title?.toLowerCase() || "").includes(filters.title.toLowerCase()) &&
          (job.location?.toLowerCase() || "").includes(filters.location.toLowerCase()) &&
          (job.job_type?.toLowerCase() || "").includes(filters.jobType.toLowerCase()) &&
          (job.salary_range?.toLowerCase() || "").includes(filters.salary.toLowerCase())
        );
      })
    : [];

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2 className="text-center mb-4 fw-bold">Job Openings</h2>

      {/* Filter Controls */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Control
            placeholder="Search by Job Title"
            name="title"
            value={filters.title}
            onChange={handleFilterChange}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            placeholder="Search by Location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </Col>
        <Col md={3}>
          <Form.Select name="jobType" value={filters.jobType} onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Control
            placeholder="Salary (e.g. 10 LPA)"
            name="salary"
            value={filters.salary}
            onChange={handleFilterChange}
          />
        </Col>
      </Row>

      {/* Loading or Error */}
      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {/* Job List */}
      <Row>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Col key={job.id} md={4}>
              <JobCard job={job} />
            </Col>
          ))
        ) : (
          !loading && <p className="text-center">No job openings found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Jobs;
