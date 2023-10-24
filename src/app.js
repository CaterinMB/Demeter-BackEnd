import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import RoutesSale from './routes/sale.routes.js';
import RoutesProductCategories from './routes/productCategories.routes.js';
import RoutesProducts from './routes/product.routes.js'

const app = express();

app.use(cors({
    credentials :  true, 
    origin: 'http://localhost:5173'
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use(RoutesSale);
app.use(RoutesProductCategories);
app.use(RoutesProducts);


export default app;