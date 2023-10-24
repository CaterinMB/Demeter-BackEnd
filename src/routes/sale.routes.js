import { Router } from "express";
import { getSale, createSale} from "../controllers/sale.controller.js";

const router = Router();

router.get('/sale', getSale);
router.post('/Csale', createSale);


export default router;