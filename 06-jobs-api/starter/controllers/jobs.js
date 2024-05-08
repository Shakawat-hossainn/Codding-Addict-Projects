
import { StatusCodes } from "http-status-codes"
import { Jobs } from "../models/Job.js"


const getAllJobs = async(req,res) => {
   const jobs = await Jobs.find({createdBy:req.user.userId})

   res.status(StatusCodes.OK).json({jobs,count:jobs.length})
  
}



const getJob = (req,res) => {
    res.json('single jobs')
  
}

const updateJob = (req,res) => {
    res.json('update jobs')
  
}

const deleteJob = (req,res) => {
    res.json('delete jobs')
  
}

const createJob = async(req,res) => {
    req.body.createdBy  = req.user.userId
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
  
}
export {getAllJobs,getJob,updateJob,createJob,deleteJob}