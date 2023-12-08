import { Router } from 'express';
import { getShopping, getShop, createShopping, disableShop, createMultipleShopping, getShopingAndShopingDetails, getShopingByProvider, getShoppingAndSuppliesBySupplierId, getShoppingAndSuppliesBySupplierIdAndDate } from '../controllers/shopping.controller.js'
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
//   moduleValidation.MODULES.SHOPPING
// ))

router.get('/shopping', getShopping);
router.get('/shopping/:id', getShop);
router.post('/shopping', createShopping);
router.post('/multpleShopping', createMultipleShopping);
router.get('/getShopingByProvider', getShopingByProvider);
router.get('/getShoppingAndSuppliesBySupplierId/:id', getShoppingAndSuppliesBySupplierId);
router.get('/getShoppingAndSuppliesBySupplierIdAndDate/:id/:date', getShoppingAndSuppliesBySupplierIdAndDate);
router.get('/getShopingAndShopingDetails', getShopingAndShopingDetails);
router.put("/shopping/disable/:id", disableShop);


export default router;