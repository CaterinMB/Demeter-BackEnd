import { Router } from 'express';
import {getShopping, getShop, createShopping, disableShop, updateShopping} from '../controllers/shopping.controller.js'

const router = Router(); 

router.get('/shopping', getShopping);
router.get('/shopping/:id', getShop);
router.post('/shopping',createShopping); 
router.put("/shopping/disable/:id", disableShop);
router.put("/shopping/update/:id", updateShopping);

export default router;