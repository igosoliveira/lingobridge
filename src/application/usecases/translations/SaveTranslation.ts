import { Translation } from "../../../domain/translation/Translation";
import { TranslatorRepository } from "../../repositories/TranslatorRepository";

export class SaveTranslation {
  constructor(readonly translatorRepository: TranslatorRepository) {}

  async execute(input: Input): Promise<Output> {
    const translation = Translation.create(
      input.source_id,
      input.translation_id,
      input.source_language_id,
      input.translation_language_id,
      input.phrases_id,
      input.translation_phrases_id
    );

    await this.translatorRepository.save(translation);

    return translation;
  }
}

type Input = {
  source_id: string;
  translation_id: string;
  source_language_id: string;
  translation_language_id: string;
  phrases_id: string;
  translation_phrases_id: string
};

type Output = {
  source_id: string;
  translation_id: string;
  source_language_id: string;
  translation_language_id: string;
  phrases_id: string;
  translation_phrases_id: string

};
