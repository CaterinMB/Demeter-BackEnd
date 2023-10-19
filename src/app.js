import express from "express";
import morgan from "morgan";    
import cookieParser from 'cookie-parser';
import cors from 'cors';
import supplierRoutes from './routes/supplier.routes.js'

const app = express();

app.use(cors({
    credentials :  true, 
    origin: 'http://localhost:5174'
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(supplierRoutes)

export default app;