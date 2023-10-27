import { Router } from "express";
import { getUsers, getUser, checkForDuplicates, createUser, updateUser, toggleUserStatus, deleteUser, getWaiters, createWaiter, duplicateWaiter } from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/validateToken.js'

const router = Router();

router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.post('/add_user', checkForDuplicates, createUser);
router.put('/user/:id', updateUser);
router.put("/user/toggle/:id", toggleUserStatus);
router.delete('/user/:id', deleteUser);

// --------------------------- Mesero ------------------------------------- //
router.get('/waiter', getWaiters);
router.post('/add_waiter', duplicateWaiter, createWaiter);

export default router;