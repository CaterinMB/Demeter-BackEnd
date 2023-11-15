import { Router } from 'express';
import { getSupplies, getSupplie, checkForDuplicates, createSupplies, disableSupplies, updateSupplies, deleteSupplies } from '../controllers/supplies.controller.js'; 

const router = Router();

router.get("/supplies", getSupplies);
router.post("/supplies", checkForDuplicates, createSupplies);
router.put("/supplies/disable/:id", disableSupplies);
router.put("/supplies/update/:id", updateSupplies);
router.delete("/supplies/:id", deleteSupplies);   
router.get("/supplies/:id", getSupplie);

export default router;