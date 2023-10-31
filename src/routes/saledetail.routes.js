import { Router } from "express";
import { createSaleDetail, getDetails, createManyDetails, lotUpd} from "../controllers/saledetail.controller.js";

const router = Router();

router.post('/Csaledetail', createSaleDetail);
router.post('/CManyDetails', createManyDetails);
router.get('/details/:id', getDetails);
router.put('/update',lotUpd )

export default router;
