import { Router } from "express";

import { getWaiters, getWaiterByState, createWaiter, duplicateWaiter, getWaiter, updateWaiter } from '../controllers/waiter.controller.js'; // Meseros
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
//     moduleValidation.MODULES.WAITER
// ))

router.get('/waiter', getWaiters);
router.get('/waiter_status', getWaiterByState);
router.get('/waiter/:id', getWaiter);
router.post('/add_waiter', duplicateWaiter, createWaiter);
router.put('/waiter/:id', updateWaiter);

export default router;