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
            title: "Software Engineer",
            company: "Google",
            location: "California",
            job_type: "Full-time",
            salary_range: "$120k - $150k",
            description: "Develop scalable applications",
            technologies: "React, Node.js, PostgreSQL",
            responsibilities: "Write clean and maintainable code"
          },
          {
            id: 2,
            title: "Data Scientist",
            company: "Amazon",
            location: "New York",
            job_type: "Full-time",
            salary_range: "$110k - $140k",
            description: "Analyze large datasets",
            technologies: "Python, Machine Learning, SQL",
            responsibilities: "Build predictive models and optimize performance"
          },
          {
            id: 3,
            title: "UI/UX Designer",
            company: "Microsoft",
            location: "Washington",
            job_type: "Contract",
            salary_range: "$80k - $100k",
            description: "Design user-friendly interfaces",
            technologies: "Figma, Adobe XD, CSS",
            responsibilities: "Create wireframes and prototypes"
          },
          {
            id: 4,
            title: "DevOps Engineer",
            company: "Netflix",
            location: "Los Angeles",
            job_type: "Full-time",
            salary_range: "$130k - $160k",
            description: "Manage CI/CD pipelines",
            technologies: "AWS, Docker, Kubernetes",
            responsibilities: "Automate deployment and monitoring"
          },
          {
            id: 5,
            title: "Product Manager",
            company: "Tesla",
            location: "Texas",
            job_type: "Full-time",
            salary_range: "$140k - $170k",
            description: "Lead product development",
            technologies: "Agile, Scrum, Business Strategy",
            responsibilities: "Define product roadmap and work with teams"
          },
          {
            id: 6,
            title: "Cybersecurity Analyst",
            company: "IBM",
            location: "Chicago",
            job_type: "Full-time",
            salary_range: "$90k - $120k",
            description: "Ensure security of systems",
            technologies: "Network Security, Ethical Hacking",
            responsibilities: "Monitor and prevent cyber threats"
          },
          {
            id: 7,
            title: "Marketing Specialist",
            company: "Facebook",
            location: "San Francisco",
            job_type: "Part-time",
            salary_range: "$70k - $90k",
            description: "Develop and execute marketing strategies",
            technologies: "SEO, Google Ads, Social Media Marketing",
            responsibilities: "Manage online campaigns and content"
          },
          {
            id: 8,
            title: "Software Engineer",
            company: "Google",
            location: "California",
            job_type: "Full-time",
            salary_range: "$100k - $150k",
            description: "Develop scalable apps",
            technologies: "React, Node.js",
            responsibilities: "Code and Deploy"
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

      {/* Loading */}
      {loading && <Spinner animation="border" className="d-block mx-auto" />}

      {/* Only show error if jobs array is empty */}
      {error && jobs.length === 0 && (
        <Alert variant="danger" className="text-center">{error}</Alert>
      )}

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
