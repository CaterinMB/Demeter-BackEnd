import { Router } from "express";

import { getUsers, getUserByState, getUser, checkForDuplicates, createUser, updateUser, toggleUserStatus, deleteUser } from '../controllers/user.controller.js'; // Empleados
import { login, logout, profile, verifyToken, forgotPassword, NewPassword, getUserCookies } from '../controllers/user.controller.js'; // Login
import { editProfile, changePassword } from "../controllers/user.controller.js"; // Usuario logueado

import { authRequired } from '../middlewares/validateToken.js'
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
//     moduleValidation.MODULES.USER
// ))

router.get('/user', getUsers);
router.get('/user_status', getUserByState);
router.get('/user/:id', getUser);
router.post('/add_user', checkForDuplicates, createUser);
router.put('/user/:id', updateUser);
router.put("/user/toggle/:id", toggleUserStatus);
router.delete('/user/:id', deleteUser);

// --------------------------- EditProfile ------------------------------------- //
router.put('/edit_profile/:id', editProfile);
router.put('/change_password/:id', changePassword);

// --------------------------- Login ------------------------------------- //
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile)
router.get('/verifyToken', verifyToken)
router.post('/resetPassword', forgotPassword);
router.post('/newPassword', NewPassword);
router.get('/getUserCookies', getUserCookies);


export default router;