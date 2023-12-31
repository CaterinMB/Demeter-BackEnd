import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import category_suppliesRoutes from './routes/suppliescategory.routes.js';
import category_productsRoutes from './routes/productcategory.routes.js'
import suppliesRoutes from '../src/routes/supplies.routes.js';
import roleRoutes from './routes/role.routes.js';
import userRoutes from './routes/user.routes.js';
import supplierRoutes from './routes/supplier.routes.js'
import shoppingRoutes from './routes/shopping.routes.js'
import shoppingdetailRoute from './routes/shopping.routes.js'


const app = express();

app.use(cors({
    credentials :  true, 
    origin: 'http://localhost:5173'
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(supplierRoutes)
app.use(shoppingRoutes)
app.use(shoppingdetailRoute)
app.use(category_suppliesRoutes);
app.use(category_productsRoutes);
app.use(suppliesRoutes);
app.use(roleRoutes);
app.use(userRoutes);

export default app;
