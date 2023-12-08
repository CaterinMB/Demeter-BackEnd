import { Router } from 'express';
import {getSupplier, getSupplie, createSupplier, disableSupplier, updateSupplier, deleteSupplier, getSupplierByState} from '../controllers/supplier.controller.js';
import ModuleValidationMiddleware from '../middlewares/ModuleValidation.middleware.js';

const router = Router();

// const moduleValidation = new ModuleValidationMiddleware(
//   ({
//     res,
//     error
//   }) => {
//     res.json({
//       message: error.message
//     })
//   }
// )
// 
// router.use(moduleValidation.hasPermissions(
//   moduleValidation.MODULES.SUPPLIER
// ))

router.get("/supplier", getSupplier);
router.get("/supplierByState", getSupplierByState);
router.get("/supplier/:id", getSupplie);
router.post("/supplier", createSupplier);
router.put("/supplier/disable/:id", disableSupplier);
router.put("/supplier/update/:id", updateSupplier);
router.delete("/supplier/:id", deleteSupplier);   

export default router;