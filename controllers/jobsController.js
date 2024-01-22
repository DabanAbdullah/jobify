import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";

export const getalljobs = async (req, res) => {
  console.log(req.user);
  const jobs = await Job.find({ createdBy: req.user.userId });
  console.log(jobs);
  res.status(StatusCodes.OK).json({ jobs });
};

export const createjob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getjobbyid = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const updatejob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

export const deletejob = async (req, res) => {
  const removedjob = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ job: removedjob });
};
