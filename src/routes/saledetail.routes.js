import { Router } from "express";
import { createSaleDetail, getDetails, createManyDetails, lotUpd, deleteSaleDetail} from "../controllers/saledetail.controller.js";

const router = Router();

router.post('/Csaledetail', createSaleDetail);
router.post('/CManyDetails', createManyDetails);
router.get('/details/:id', getDetails);
router.put('/update',lotUpd )
router.delete('/deleteDetailS/:ID_SaleDetail',deleteSaleDetail )

export default router;