import { Router } from "express";
import { getSale } from "../controllers/sale.controller.js";

const router = Router();

router.get('/sale', getSale);


export default router;