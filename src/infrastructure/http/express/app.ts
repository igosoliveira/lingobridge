import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import cors from 'cors';
import express from 'express';
import { routes } from './routes/routes';
import MongoDB from '../../repositories/mongodb/mongodb';

MongoDB.connect()

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

export { app };
