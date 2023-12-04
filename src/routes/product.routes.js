import { Router } from "express";
import { getProducts, getProduct, getProductsByCategory, checkForDuplicates, createProduct, updateProduct, toggleProductStatus, deleteProduct } from '../controllers/product.controller.js';
import { authRequired } from '../middlewares/validateToken.js'
import ModuleValidationMiddleware from "../middlewares/ModuleValidation.middleware.js";

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
  moduleValidation.MODULES.PRODUCT,
))

router.get('/product', getProducts);
router.get('/categoriesproduct/:id', getProductsByCategory);
router.get('/product/:id', getProduct);
router.post('/add_product', checkForDuplicates, createProduct);
router.put('/product/:id', updateProduct);
router.put("/product/toggle/:id", toggleProductStatus);
router.delete('/product/:id', deleteProduct);

export default router;