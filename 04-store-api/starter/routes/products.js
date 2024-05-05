import { getAllProducts,getAllProductsStatic } from "../controllers/products.js";
import { Router } from "express";

const router = Router()

router.route('/static').get(getAllProductsStatic)
router.route('/').get(getAllProducts)

export default router




