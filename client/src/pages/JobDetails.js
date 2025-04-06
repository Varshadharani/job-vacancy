import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../context/JobContext";

const CreateJobPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const { jobs, setJobs } = useContext(JobContext); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/jobs", data);
      const newJob = response.data; // Get the created job from API response
      setJobs([...jobs, newJob]); // ✅ Update global state immediately
      reset();
      navigate("/"); // ✅ Redirect to home after creating job
    } catch (err) {
      setError("Failed to add job. Please try again.");
      console.error("Error adding job:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Create Job Opening</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" {...register("title")} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" {...register("company")} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" {...register("location")} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Job Type</Form.Label>
          <Form.Select {...register("jobType")} required>
            <option value="FullTime">Full-Time</option>
            <option value="PartTime">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Salary Range</Form.Label>
          <Form.Control type="text" {...register("salary")} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Application Deadline</Form.Label>
          <Form.Control type="date" {...register("deadline")} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Job Description</Form.Label>
          <Form.Control as="textarea" rows={3} {...register("description")} required />
        </Form.Group>
        <div className="text-end mt-3">
          <Button variant="secondary" className="me-2" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Publish »"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateJobPage;
