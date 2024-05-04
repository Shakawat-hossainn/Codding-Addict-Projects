import { Router } from "express";
import { getAllTasks,getSingleTask,updateTask,deleteTask,createTask } from "../controllers/tasks.js";
const router = Router()

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask)
  



export default router