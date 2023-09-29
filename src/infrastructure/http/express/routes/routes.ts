import { Router } from 'express';
import { textRoutes } from './TextRoutes';
import { translationRoutes } from './TranslationRoutes';
import { languageRoutes } from './LanguageRoutes';

const routes = Router();

routes.use('/text', textRoutes);
routes.use('/translation', translationRoutes)
routes.use('/language', languageRoutes)

export { routes };
