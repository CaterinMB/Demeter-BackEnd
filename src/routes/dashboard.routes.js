import { Router } from 'express';
import {
    mostPurchasedSupplies,
    mostSoldProducts,
    totalProfitAndExpenses,
    organizeByDay,
    organizeByWeek,
    organizeByMonth,
    totalProfitAndExpensesByPaymentMethod,
    totalUnitsPurchasedBySupply,
    totalUnitsSoldByProduct,
    averageUnitsPerPurchase,
    averageUnitsPerSale,
    netIncomeByProduct,
    netIncomeBySupply
} from '../controllers/dashboard.controller.js';

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
    moduleValidation.MODULES.DASHBOARD
))

router.get("/dashboard/most-purchased-supplies", authRequired, mostPurchasedSupplies);
router.get("/dashboard/most-sold-products", authRequired, mostSoldProducts);
router.get("/dashboard/total-profit-expenses", authRequired, totalProfitAndExpenses);
router.get("/dashboard/organize-by-day", authRequired, organizeByDay);
router.get("/dashboard/organize-by-week", authRequired, organizeByWeek);
router.get("/dashboard/organize-by-month", authRequired, organizeByMonth);
router.get("/dashboard/profit-expenses-payment-method", authRequired, totalProfitAndExpensesByPaymentMethod);
router.get("/dashboard/total-units-purchased-by-supply", authRequired, totalUnitsPurchasedBySupply);
router.get("/dashboard/total-units-sold-by-product", authRequired, totalUnitsSoldByProduct);
router.get("/dashboard/average-units-per-purchase", authRequired, averageUnitsPerPurchase);
router.get("/dashboard/average-units-per-sale", authRequired, averageUnitsPerSale);
router.get("/dashboard/net-income-by-product", authRequired, netIncomeByProduct);
router.get("/dashboard/net-income-by-supply", authRequired, netIncomeBySupply);

export default router;
