import { Router } from "express";

import { getProducts, getProductByState, getProductsByCategory, checkForDuplicates, createProduct, updateProduct, toggleProductStatus, deleteProduct } from '../controllers/product.controller.js';
import { getDetailProduct, createDetailP, deleteDetailProduct } from '../controllers/product.controller.js'; //Detalles

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
//     moduleValidation.MODULES.PRODUCT
// ))

router.get('/product', getProducts);
router.get('/product_state', getProductByState);
router.post('/add_product', checkForDuplicates, createProduct);
router.put('/update_product/:id', updateProduct);
router.put('/product/toggle/:id', toggleProductStatus);
router.delete('/product/:id', deleteProduct);
router.get('/product/:id', getProductsByCategory);

//Detalles
router.get('/product_detail/:id', getDetailProduct)
router.post('/add_details/:id', createDetailP)
router.delete('/details/:id', deleteDetailProduct)

export default router;