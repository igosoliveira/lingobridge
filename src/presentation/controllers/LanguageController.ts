import { getLanguagesUsecase } from "../../di/language";
import { Request, Response } from "express";
import { getAvailableLanguagesUseCase } from "../../di/translation";

export class LanguageController {
  static async getAll(
    request: Request,
    reponse: Response
  ): Promise<Response> {
    const texts = await getLanguagesUsecase.execute();
    return reponse.send(texts).status(200);
  }

  static async getAvailableLanguages(
    request: Request,
    reponse: Response
  ): Promise<Response> {
    const language = request.params.language as string;

    if (!language) {
      return reponse.send({ error: "error" });
    }

    const languages = await getAvailableLanguagesUseCase.execute({
      language,
    });
    return reponse.send(languages).status(200);
  }
}
