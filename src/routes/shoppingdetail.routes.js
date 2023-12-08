import { Router } from 'express';
import {getshoppingDetail, getShopDetail, createShopping } from '../controllers/shoppingdetail.controller.js'
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

router.get('/shoppingdetail', getshoppingDetail);
router.get('/shoppingdetail/:id', getShopDetail);
router.post('/shoppingdetail', createShopping);

export default router