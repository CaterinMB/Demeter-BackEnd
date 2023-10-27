import { Router } from "express";
import { getRoles, getRole, checkForDuplicates, createRoles, updateRole, toggleRoleStatus, deleteRole,  } from '../controllers/role.controller.js';

const router = Router();

router.get('/role', getRoles);
router.get('/role/:id', getRole);
router.post('/add_role', checkForDuplicates, createRoles);
router.put('/role/:id', updateRole);
router.put('/role/toggle/:id', toggleRoleStatus);
router.delete('/role/:id', deleteRole);

export default router;