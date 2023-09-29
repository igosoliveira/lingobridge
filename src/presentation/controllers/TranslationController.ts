import { Request, Response } from "express";
import {
  getTranslationsUseCase,
} from "../../di/translation";

export class TranslationController {
  static async getTexts(
    request: Request,
    reponse: Response
  ): Promise<Response> {
    const fromLanguage = request.query.from as string;
    const toLanguage = request.query.to as string;

    if (!fromLanguage && !toLanguage) {
      return reponse.send({ error: "error" });
    }
    const texts = await getTranslationsUseCase.execute({
      fromLanguage,
      toLanguage,
    });
    return reponse.send(texts).status(200);
  }

}
