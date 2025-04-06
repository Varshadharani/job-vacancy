import React, { useContext, useEffect, useState } from "react";
import JobCard from "../components/JobCards";
import { Container, Row, Col, Spinner, Alert, Form } from "react-bootstrap";
import axios from "axios";
import { JobContext } from "../context/JobContext"; // ✅ Import Job Context

const Jobs = () => {
  const { jobs, setJobs } = useContext(JobContext); // ✅ Use Job Context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "",
    salary: ""
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then((response) => {
        setJobs(response.data); // Load jobs dynamically
      })
      .catch((err) => {
        setError("Failed to load jobs. Please try again.");
        console.error("Error fetching jobs:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setJobs]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (job.title?.toLowerCase() || "").includes(filters.title.toLowerCase()) &&
      (job.location?.toLowerCase() || "").includes(filters.location.toLowerCase()) &&
      (job.jobtype?.toLowerCase() || "").includes(filters.jobType.toLowerCase()) &&
      (job.salary?.toLowerCase() || "").includes(filters.salary.toLowerCase())
    );
  });

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
        Job Openings
      </h2>

      {/*  Filter Controls */}
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
            <option value="FullTime">Full-Time</option>
            <option value="PartTime">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
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

      {/*  Loading or Error */}
      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {/*  Job List */}
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
