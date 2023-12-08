import { Router } from "express";
import { getRoles, getRole, checkForDuplicates, createRoles, updateRole, toggleRoleStatus, deleteRole, addModuleToRole, addMultipleModuleAndRole, addMultipleModuleAndRoleAndDeleteIfExists, } from '../controllers/role.controller.js';
import { datosType } from '../controllers/role.controller.js';

const router = Router();

router.get('/role', getRoles);
router.post('/role/addModuleToRole/:roleId/:moduleId', addModuleToRole);
router.post('/role/addMultipleModuleAndRole/:roleId', addMultipleModuleAndRole);
router.post('/role/addMultipleModuleAndRoleAndDeleteIfExists/:roleId', addMultipleModuleAndRoleAndDeleteIfExists);
router.get('/role/:id', getRole);
router.post('/add_role', checkForDuplicates, createRoles);
router.put('/role/:id', updateRole);
router.put('/role/toggle/:id', toggleRoleStatus);
router.delete('/role/:id', deleteRole);

// --------------------------- TypeUser --------------------------- //

router.post('/type', datosType);

export default router;