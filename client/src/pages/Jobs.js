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
          setError("Invalid data received from server.");
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again.");
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
