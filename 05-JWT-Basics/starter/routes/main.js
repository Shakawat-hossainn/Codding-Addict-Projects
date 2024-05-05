import { dashboard,login } from "../controllers/main.js";
import authenticalMidlleware from "../middleware/auth.js";
import { Router } from "express";

const router = Router()

router.route('/login').post(login)
router.route("/dashboard").get(authenticalMidlleware,dashboard)

export default router