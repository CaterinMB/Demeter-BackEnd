import { Router } from "express";
import { getCategoriesProducts } from "../controllers/productCategories.controller.js";

const router = Router();

router.get('/productCategories', getCategoriesProducts);


export default router;