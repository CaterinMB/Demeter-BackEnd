import { Router } from 'express'

import { getCategory_products, getOneCategory_products, checkForDuplicates, createCategory_products, disableCategory_products, updateCategory_products, deleteCategory_products } from '../controllers/productcategory.controller.js'

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
    moduleValidation.MODULES.CATEGORY_PRODUCT
))

router.get('/productcategory', authRequired, getCategory_products);
router.post('/productcategory', authRequired, checkForDuplicates, createCategory_products);
router.put('/productcategory/disable/:id', authRequired, disableCategory_products);
router.put('/productcategory/update/:id', authRequired, updateCategory_products);
router.delete('/productcategory/:id', authRequired, deleteCategory_products);
router.get('/productcategory/:id', authRequired, getOneCategory_products);

export default router;