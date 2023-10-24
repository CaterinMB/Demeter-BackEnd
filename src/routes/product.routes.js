import { Router } from "express";
import { getProduct, getProductsByCategory } from "../controllers/products.controller.js";

const router = Router();

router.get('/product/:id', getProductsByCategory);
router.get('/Singleproduct/:id', getProduct);



export default router;