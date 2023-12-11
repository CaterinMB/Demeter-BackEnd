import { Router } from 'express';

import { getShopping, getShop, createShopping, disableShop, createMultipleShopping, getShopingAndShopingDetails, getShopingByProvider, getShoppingAndSuppliesBySupplierId, getShoppingAndSuppliesBySupplierIdAndDate } from '../controllers/shopping.controller.js'

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
    moduleValidation.MODULES.SHOPPING
))

router.get('/shopping', authRequired, getShopping);
router.get('/shopping/:id', authRequired, getShop);
router.post('/shopping', authRequired, createShopping);
router.post('/multpleShopping', authRequired, createMultipleShopping);
router.get('/getShopingByProvider', authRequired, getShopingByProvider);
router.get('/getShoppingAndSuppliesBySupplierId/:id', authRequired, getShoppingAndSuppliesBySupplierId);
router.get('/getShoppingAndSuppliesBySupplierIdAndDate/:id/:date', authRequired, getShoppingAndSuppliesBySupplierIdAndDate);
router.get('/getShopingAndShopingDetails', authRequired, getShopingAndShopingDetails);
router.put("/shopping/disable/:id", authRequired, disableShop);


export default router;