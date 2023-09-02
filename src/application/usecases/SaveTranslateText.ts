import { Translation } from "../../domain/translation/Translation";
import { TranslatorRepository } from "../repositories/TranslatorRepository";

export class SaveTranslateText {
  constructor(readonly translatorRepository: TranslatorRepository) {}

  async execute(input: Input): Promise<Output> {
    const translate = Translation.create(input.text_id, input.language_id);

    await this.translatorRepository.save(translate);

    return translate;
  }
}

type Input = {
  language_id: string;
  text_id: string;
};

type Output = {
  language_id: string;
  text_id: string;
};
