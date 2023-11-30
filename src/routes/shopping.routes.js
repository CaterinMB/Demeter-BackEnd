import { Router } from 'express';
import { getShopping, getShop, createShopping, disableShop, createMultipleShopping, getShopingAndShopingDetails } from '../controllers/shopping.controller.js'

const router = Router();

router.get('/shopping', getShopping);
router.get('/shopping/:id', getShop);
router.post('/shopping', createShopping);
router.post('/multpleShopping', createMultipleShopping);
router.get('/getShopingAndShopingDetails', getShopingAndShopingDetails);
router.put("/shopping/disable/:id", disableShop);


export default router;