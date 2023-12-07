import { Router } from "express";

import { getRoles, getRoleByState, getRole, checkForDuplicates, createRoles, updateRole, toggleRoleStatus, deleteRole,  } from '../controllers/role.controller.js';
import { datosType } from '../controllers/role.controller.js';

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
//     moduleValidation.MODULES.SETTINGS
// ))

router.get('/role', getRoles);
router.get('/role_status', getRoleByState);
router.get('/role/:id', getRole);
router.post('/add_role', checkForDuplicates, createRoles);
router.put('/role/:id', updateRole);
router.put('/role/toggle/:id', toggleRoleStatus);
router.delete('/role/:id', deleteRole);

// --------------------------- TypeUser --------------------------- //

router.post('/type', datosType);

export default router;