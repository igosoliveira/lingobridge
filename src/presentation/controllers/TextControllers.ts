import { getTextsUseCase } from "../../di/text";
import { Request, Response } from "express";

export class TextController {
  static async getTexts(
    request: Request,
    reponse: Response
  ): Promise<Response> {
    const language = request.params.language;
    const texts = await getTextsUseCase.execute({ language});

    return reponse.send(texts).status(200);
  }
}
