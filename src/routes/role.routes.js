import { Router } from "express";

import { getRoles, getRoleByState, getRole, checkForDuplicates, createRoles, updateRole, toggleRoleStatus, deleteRole,  } from '../controllers/role.controller.js';

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
    moduleValidation.MODULES.SETTINGS
))

router.get('/role', authRequired, getRoles);
router.get('/role_status', authRequired, getRoleByState);
router.get('/role/:id', authRequired, getRole);
router.post('/add_role', authRequired, checkForDuplicates, createRoles);
router.put('/role/:id', authRequired, updateRole);
router.put('/role/toggle/:id', authRequired, toggleRoleStatus);
router.delete('/role/:id', authRequired, deleteRole);


export default router;