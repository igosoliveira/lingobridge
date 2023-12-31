import express, { Request, Response } from "express";
import { TextController } from "../../../../presentation/controllers/TextController";

const textRoutes = express.Router();

textRoutes.get(
  "/getAll/:language",
  async (req: Request, res: Response) => await TextController.getTexts(req, res)
);

export { textRoutes };
