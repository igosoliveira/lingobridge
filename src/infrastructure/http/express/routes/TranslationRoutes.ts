import express, { Request, Response } from "express";
import { TranslationController } from "../../../../presentation/controllers/TranslationController";

const translationRoutes = express.Router();

translationRoutes.get(
  "/:language",
  async (req: Request, res: Response) => await TranslationController.getTexts(req, res)
);

export { translationRoutes };
