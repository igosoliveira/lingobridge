import { Request, Response } from "express";
import { getTranslationsUseCase } from "../../di/translation";

export class TranslationController {
  static async getTexts(
    request: Request,
    reponse: Response
  ): Promise<Response> {
    const language = request.params.language;
    const texts = await getTranslationsUseCase.execute({ language});
    return reponse.send(texts).status(200);
  }
}
