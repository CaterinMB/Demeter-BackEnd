import { Router } from 'express'

import { getCategory_supplies, getOneCategory_supplies, checkForDuplicates, createCategory_supplies, disableCategory_supplies, updateCategory_supplies, deleteCategory_supplies,  } from '../controllers/suppliescategory.controller.js'

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
    moduleValidation.MODULES.CATEGORY_SUPPLIES
))

router.get('/suppliescategory', authRequired, getCategory_supplies);
router.post('/suppliescategory', authRequired, checkForDuplicates, createCategory_supplies);
router.put('/suppliescategory/disable/:id', authRequired, disableCategory_supplies);
router.put('/suppliescategory/update/:id', authRequired, updateCategory_supplies);
router.delete('/suppliescategory/:id', authRequired, deleteCategory_supplies);
router.get('/suppliescategory/:id', authRequired, getOneCategory_supplies);

export default router;