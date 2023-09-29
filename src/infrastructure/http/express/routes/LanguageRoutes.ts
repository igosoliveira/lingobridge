import express, { Request, Response } from "express";
import { LanguageController } from "../../../../presentation/controllers/LanguageController";

const languageRoutes = express.Router();

languageRoutes.get(
  "/getAll",
  async (req: Request, res: Response) => await LanguageController.getAll(req, res)
);
languageRoutes.get(
  "/:language",
  async (req: Request, res: Response) => await LanguageController.getAvailableLanguages(req, res)
);




export { languageRoutes };
