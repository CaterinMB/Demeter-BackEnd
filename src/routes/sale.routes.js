import { Router } from "express";
import { getSale, createSale, updateSale} from "../controllers/sale.controller.js";

const router = Router();

router.get('/sale', getSale);
router.post('/Csale', createSale);
router.put('/UpdateSale', updateSale);



export default router;