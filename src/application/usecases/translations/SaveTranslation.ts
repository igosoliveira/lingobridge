import { Translation } from "../../../domain/translation/Translation";
import { TranslatorRepository } from "../../repositories/TranslatorRepository";

export class SaveTranslation {
  constructor(readonly translatorRepository: TranslatorRepository) {}

  async execute(input: Input): Promise<Output> {
    const translation = Translation.create(
      input.source_text_id,
      input.translation_text_id,
      input.source_text_language_id,
      input.translation_text_language_id
    );

    await this.translatorRepository.save(translation);

    return translation;
  }
}

type Input = {
  source_text_id: string;
  translation_text_id: string;
  source_text_language_id: string;
  translation_text_language_id: string;
};

type Output = {
  source_text_id: string;
  translation_text_id: string;
  source_text_language_id: string;
  translation_text_language_id: string;
};
