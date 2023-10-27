import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import routesRole from './routes/role.routes.js';
import routesUser from './routes/user.routes.js';
import routesType from './routes/type.routes.js';

const app = express();

app.use(cors({
    credentials :  true, 
    origin: 'http://localhost:5173'
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(routesRole);
app.use(routesUser);
app.use(routesType);

export default app;