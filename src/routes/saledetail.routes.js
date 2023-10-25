import { Router } from "express";
import { createSaleDetail, getDetails} from "../controllers/saledetail.controller.js";

const router = Router();

router.post('/Csaledetail', createSaleDetail);
router.get('/details/:id', getDetails);


export default router;