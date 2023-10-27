import { Router } from "express";
import { getTypeUsers, getTypeUser, checkForDuplicates, createTypeUsers, updateTypeUser, toggleTypeUserStatus, deleteTypeUser,  } from '../controllers/type.controller.js';

const router = Router();

router.get('/typeUser', getTypeUsers);
router.get('/typeUser/:id', getTypeUser);
router.post('/add_typeUser', checkForDuplicates, createTypeUsers);
router.put('/typeUser/:id', updateTypeUser);
router.put('/typeUser/toggle/:id', toggleTypeUserStatus);
router.delete('/typeUser/:id', deleteTypeUser);

export default router;