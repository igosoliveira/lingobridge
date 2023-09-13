import { Router } from 'express';
import { textRoutes } from './TextRoutes';

const routes = Router();

routes.use('/text', textRoutes);

export { routes };
