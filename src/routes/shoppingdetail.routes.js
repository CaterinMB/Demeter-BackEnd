import { Router } from 'express';

import {getshoppingDetail, getShopDetail, createShopping } from '../controllers/shoppingdetail.controller.js'

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

router.get('/shoppingdetail', authRequired, getshoppingDetail);
router.get('/shoppingdetail/:id', authRequired, getShopDetail);
router.post('/shoppingdetail', authRequired, createShopping);

