const {
  UnAuthenticatedErrorAPI,
  BadRequestErrorAPI,
  NotFoundErrorAPI,
} = require("../errors");
const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  // console.log("I WILL FETCH ALL JOBS");
  const jobs = await Job.find({});
  res.status(200).send({ success: true, data: jobs, results: jobs.length });
};

const createJob = async (req, res) => {
  const { company, position, status } = req.body;
  const { userId } = req.user;

  const job = await Job.create({
    company,
    position,
    status,
    createdBy: userId,
  });

  if (!job) {
    throw new BadRequestErrorAPI("job not created");
  }

  res
    .status(201)
    .send({ success: true, msg: "Job created successfully", data: job });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundErrorAPI("Not Such Job Found");
  }

  res.status(200).send({ success: true, data: job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundErrorAPI(`No job with id ${jobId}`);
  }
  res.status(200).send({ success: true, msg: "Job deleted successfully" });
};

const updateJob = async (req, res) => {
  const {
    user: { userId },
    body: { company, position, status },
    params: { id },
  } = req;

  if (!company || !position || !status) {
    throw new BadRequestErrorAPI(
      "company, position and status field can't be empty"
    );
  }

  const job = await Job.findByIdAndUpdate(
    { _id: id, createdBy: userId },
    { company, position, status },
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new BadRequestErrorAPI("No such job available to update");
  }

  console.log(job);

  res
    .status(200)
    .send({ success: true, data: job, msg: "job updated successfully" });
};

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  deleteJob,
  updateJob,
};
