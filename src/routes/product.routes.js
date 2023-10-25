import { Router } from "express";
import { getProduct, getProductsByCategory,getAllProduct } from "../controllers/products.controller.js";

const router = Router();

router.get('/product/:id', getProductsByCategory);
router.get('/Singleproduct/:id', getProduct);
router.get('/AllProducts', getAllProduct);



export default router;