import { Translation } from "../../../domain/translation/Translation";
import { TranslatorRepository } from "../../repositories/TranslatorRepository";

export class SaveTranslation {
  constructor(readonly translatorRepository: TranslatorRepository) {}

  async execute(input: Input): Promise<Output> {
    const translation = Translation.create(
      {
        id: input.source_id,
        phrases_id: input.phrases_id,
        language_id: input.source_language_id,
      },
      {
        id: input.translation_id,
        phrases_id: input.translation_phrases_id,
        language_id: input.translation_language_id,
      }
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
  translation_phrases_id: string;
};

type Output = Translation;
