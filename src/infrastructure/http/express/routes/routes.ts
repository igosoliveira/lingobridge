import { Router } from 'express';
import { textRoutes } from './TextRoutes';
import { translationRoutes } from './TranslationRoutes';

const routes = Router();

routes.use('/text', textRoutes);
routes.use('/translation', translationRoutes)

export { routes };
