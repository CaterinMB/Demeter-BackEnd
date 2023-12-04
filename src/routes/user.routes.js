import { Router } from "express";
import { getUsers, getUser, checkForDuplicates, createUser, updateUser, toggleUserStatus, deleteUser } from '../controllers/user.controller.js'; // Empleados
import { getWaiters, createWaiter, duplicateWaiter, getWaiter } from '../controllers/user.controller.js'; // Meseros
import { editProfile, changePassword } from "../controllers/user.controller.js"; // Usuario logueado
import { authRequired } from '../middlewares/validateToken.js'

const router = Router();

router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.post('/add_user', checkForDuplicates, createUser);
router.put('/user/:id', updateUser);
router.put("/user/toggle/:id", toggleUserStatus);
router.delete('/user/:id', deleteUser);

// --------------------------- EditProfile ------------------------------------- //
router.put('/edit_profile/:id', editProfile);
router.put('/change_password/:id', changePassword);

// --------------------------- Mesero ------------------------------------- //
router.get('/waiter', getWaiters);
router.get('/waiter/:id', getWaiter);
router.post('/add_waiter', duplicateWaiter, createWaiter);

export default router;