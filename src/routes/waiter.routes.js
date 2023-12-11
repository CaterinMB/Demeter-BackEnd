import { Router } from "express";

import { getWaiters, getWaiterByState, createWaiter, duplicateWaiter, getWaiter, updateWaiter } from '../controllers/waiter.controller.js'; // Meseros

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
    moduleValidation.MODULES.WAITER
))

router.get('/waiter', authRequired, getWaiters);
router.get('/waiter_status', authRequired, getWaiterByState);
router.get('/waiter/:id', authRequired, getWaiter);
router.post('/add_waiter', authRequired, duplicateWaiter, createWaiter);
router.put('/waiter/:id', authRequired, updateWaiter);

export default router;