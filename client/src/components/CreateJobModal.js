import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

const CreateJobModal = ({ show, handleClose, addJob }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/api/jobs", data)
      .then((res) => {
        addJob(res.data); // Update job list
        reset();
        handleClose(); // Close modal
      })
      .catch((error) => console.error("Error adding job:", error));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Job Opening</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
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
            <Form.Control
              as="textarea"
              rows={3}
              {...register("description")}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Save Draft
          </Button>
          <Button variant="primary" type="submit">
            Publish &raquo;
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateJobModal;
