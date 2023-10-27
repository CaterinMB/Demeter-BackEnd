import { Router } from "express";
import { getTypeUsers, datosType } from '../controllers/type.controller.js';

const router = Router();

router.get('/type', getTypeUsers);
router.post('/add-type', datosType);

export default router;