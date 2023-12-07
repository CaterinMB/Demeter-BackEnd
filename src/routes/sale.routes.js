import { Router } from "express";

import { getSale, createSale, updateSale, pay, getOneSale, deleteSale} from "../controllers/sale.controller.js";

import ModuleValidationMiddleware from '../middlewares/ModuleValidation.middleware.js'

const router = Router();

// const moduleValidation = new ModuleValidationMiddleware(
//     ({
//         res,
//         error
//     }) => {
//         res.json({
//             message: error.message
//         })
//     }
// )

// router.use(moduleValidation.hasPermissions(
//     moduleValidation.MODULES.SALES
// ))

router.get('/sale', getSale);
router.get('/getSale/:ID_Sale', getOneSale);
router.post('/Csale', createSale);
router.put('/UpdateSale', updateSale);
router.put('/paySale', pay);
router.delete('/deleteSale', deleteSale);


export default router;