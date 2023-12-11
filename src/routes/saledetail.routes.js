import { Router } from "express";

import { createSaleDetail, getDetails, createManyDetails, lotUpd, deleteSaleDetail} from "../controllers/saledetail.controller.js";

import { authRequired } from '../middlewares/validateToken.js'
import ModuleValidationMiddleware from '../middlewares/ModuleValidation.middleware.js'

const router = Router();

const moduleValidation = new ModuleValidationMiddleware(
    ({
        res,
        error
    }) => {
        res.json({
            message: error.message
        })
    }
)

router.use(moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
))

router.post('/Csaledetail', authRequired, createSaleDetail);
router.post('/CManyDetails', authRequired, createManyDetails);
router.get('/details/:id', authRequired, getDetails);
router.put('/update', authRequired, lotUpd )
router.delete('/deleteDetailS/:ID_SaleDetail', authRequired, deleteSaleDetail )

export default router;