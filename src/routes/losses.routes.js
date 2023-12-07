import { Router } from 'express';
import { getLosses, getLoss, createLoss } from '../controllers/losses.controller.js'; 

const router = Router();

router.get("/losses", getLosses);
router.get("/losses/:id", getLoss);
router.post("/losses", createLoss);

export default router;
