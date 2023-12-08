import { Router } from 'express'
import { getCategory_products, getOneCategory_products, checkForDuplicates, createCategory_products, disableCategory_products, updateCategory_products, deleteCategory_products } from '../controllers/productcategory.controller.js'

import ModuleValidationMiddleware from "../middlewares/ModuleValidation.middleware.js";

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
//   moduleValidation.MODULES.CATEGORY_PRODUCT
// ))

router.get('/productcategory', getCategory_products);
router.post('/productcategory', checkForDuplicates, createCategory_products);
router.put('/productcategory/disable/:id', disableCategory_products);
router.put('/productcategory/update/:id', updateCategory_products);
router.delete('/productcategory/:id', deleteCategory_products);
router.get('/productcategory/:id', getOneCategory_products);

export default router;