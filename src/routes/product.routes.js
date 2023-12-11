import { Router } from "express";

import { getProducts, getProductByState, getProductsByCategory, checkForDuplicates, createProduct, updateProduct, toggleProductStatus, deleteProduct } from '../controllers/product.controller.js';
import { getDetailProduct, createDetailP, deleteDetailProduct } from '../controllers/product.controller.js'; //Detalles

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
    moduleValidation.MODULES.PRODUCT
))

router.get('/product', authRequired, getProducts);
router.get('/product_state', authRequired, getProductByState);
router.post('/add_product', authRequired, checkForDuplicates, createProduct);
router.put('/update_product/:id', authRequired, updateProduct);
router.put('/product/toggle/:id', authRequired, toggleProductStatus);
router.delete('/product/:id', authRequired, deleteProduct);
router.get('/product/:id', authRequired, getProductsByCategory);

//Detalles
router.get('/product_detail/:id', authRequired, getDetailProduct)
router.post('/add_details/:id', authRequired, createDetailP)
router.delete('/details/:id', authRequired, deleteDetailProduct)

export default router;