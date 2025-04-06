import React, { useState } from "react";
import { Button, Modal, TextInput, Select, Slider } from "@mantine/core";
import { useForm } from "react-hook-form";

const jobData = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Amazon",
    experience: "1-3 yr",
    location: "Onsite",
    salary: "12 LPA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    id: 2,
    title: "Node Js Developer",
    company: "Tesla",
    experience: "1-3 yr",
    location: "Onsite",
    salary: "12 LPA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
  },
];

function JobList() {
  const [opened, setOpened] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { register, handleSubmit } = useForm();

  const openModal = (job) => {
    setSelectedJob(job);
    setOpened(true);
  };

  const submitApplication = (data) => {
    console.log("Application Data:", data);
    setOpened(false);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {jobData.map((job) => (
          <div key={job.id} className="col-md-4">
            <div className="card p-3">
              <img src={job.logo} alt="logo" className="card-img-top" style={{ height: 50, width: 50 }} />
              <h5>{job.title}</h5>
              <p>{job.company}</p>
              <p>{job.experience} | {job.location} | {job.salary}</p>
              <Button color="blue" onClick={() => openModal(job)}>Apply Now</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Job Application Modal */}
      <Modal opened={opened} onClose={() => setOpened(false)} title="Apply for Job">
        <form onSubmit={handleSubmit(submitApplication)}>
          <TextInput label="Full Name" {...register("name")} required />
          <TextInput label="Email" type="email" {...register("email")} required />
          <Select label="Job Type" data={["Full-Time", "Part-Time", "Internship"]} {...register("jobType")} required />
          <Slider label="Expected Salary" min={50000} max={800000} step={50000} defaultValue={50000} {...register("expectedSalary")} />
          <Button type="submit" fullWidth mt="md">Submit</Button>
        </form>
      </Modal>
    </div>
  );
}

export default JobList;
