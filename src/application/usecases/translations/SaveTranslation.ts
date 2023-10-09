import { Translation } from "../../../domain/translation/Translation";
import { TranslatorRepository } from "../../repositories/TranslatorRepository";

export class SaveTranslation {
  constructor(readonly translatorRepository: TranslatorRepository) {}

  async execute(input: Input): Promise<Output> {
    const translation = Translation.create(input.text, input.translation);

    await this.translatorRepository.save(translation);

    return translation;
  }
}

type Input = {
  text: {
    id: string;
    phrases_id: string;
    language_id: string;
  };
  translation: {
    id: string;
    phrases_id: string;
    language_id: string;
  };
};

type Output = Translation;
