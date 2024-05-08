import express from 'express'
import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/jobs.js";

const router = express.Router()

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').patch(updateJob).delete(deleteJob).get(getJob)

export default router

