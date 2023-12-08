import { Router } from "express";
import { getUsers, getUser, checkForDuplicates, createUser, updateUser, toggleUserStatus, deleteUser, login, logout, profile, verifyToken, forgotPassword, NewPassword, getUserCookies, getCurrentUser } from '../controllers/user.controller.js';
import { getWaiters, createWaiter, duplicateWaiter, getWaiter } from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/validateToken.js'

const router = Router();

router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.get('/getUserCookies', getUserCookies);
router.get('/getCurrentUser', getCurrentUser);
router.post('/add_user', checkForDuplicates, createUser);
router.put('/user/:id', updateUser);
router.put("/user/toggle/:id", toggleUserStatus);
router.delete('/user/:id', deleteUser);

// --------------------------- Mesero ------------------------------------- //
router.get('/waiter', getWaiters);
router.get('/waiter/:id', getWaiter);
router.post('/add_waiter', duplicateWaiter, createWaiter);

// --------------------------- Login ------------------------------------- //
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile)
router.get('/verifyToken', verifyToken)
router.post('/resetPassword', forgotPassword);
router.post('/newPassword', NewPassword);


export default router;