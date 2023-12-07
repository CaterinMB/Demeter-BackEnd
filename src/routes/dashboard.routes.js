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

import ModuleValidationMiddleware from '../middlewares/ModuleValidation.middleware.js'

const router = Router();

// const moduleValidation = new ModuleValidationMiddleware(
//     ({
//         res,
//         error
//     }) => {
//         res.json({
//             message: error.message
//         })
//     }
// )

// router.use(moduleValidation.hasPermissions(
//     moduleValidation.MODULES.DASHBOARD
// ))

router.get("/dashboard/most-purchased-supplies", mostPurchasedSupplies);
router.get("/dashboard/most-sold-products", mostSoldProducts);
router.get("/dashboard/total-profit-expenses", totalProfitAndExpenses);
router.get("/dashboard/organize-by-day", organizeByDay);
router.get("/dashboard/organize-by-week", organizeByWeek);
router.get("/dashboard/organize-by-month", organizeByMonth);
router.get("/dashboard/profit-expenses-payment-method", totalProfitAndExpensesByPaymentMethod);
router.get("/dashboard/total-units-purchased-by-supply", totalUnitsPurchasedBySupply);
router.get("/dashboard/total-units-sold-by-product", totalUnitsSoldByProduct);
router.get("/dashboard/average-units-per-purchase", averageUnitsPerPurchase);
router.get("/dashboard/average-units-per-sale", averageUnitsPerSale);
router.get("/dashboard/net-income-by-product", netIncomeByProduct);
router.get("/dashboard/net-income-by-supply", netIncomeBySupply);

export default router;
