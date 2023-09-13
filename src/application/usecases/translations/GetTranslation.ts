import { Translation } from "../../../domain/translation/Translation";
import { TextRepository } from "../../repositories/TextRepository";
import { TranslatorRepository } from "../../repositories/TranslatorRepository";

export class GetTranslation {
  constructor(
    readonly translatorRepository: TranslatorRepository,
    readonly textRepository: TextRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const translations: Translation[] = await this.translatorRepository.findAll(
      input.language
    );
    const response = [];

    for (const translation of translations) {
      const {
        source_text_id: sourceId,
        translation_text_id: translationId
      } = translation;

      const sourceText = await this.textRepository.findById(sourceId);
      const translateText = await this.textRepository.findById(translationId);

      response.push({
        id: translation.id,
        text: {
          title: sourceText?.title,
          content: sourceText?.content,
          audio: sourceText?.audio_url,
          language: sourceText?.language_id,
        },
        translate: {
          title: translateText?.title,
          content: translateText?.content,
          language: translateText?.language_id,
        },
      });
    }
    return response;
  }
}

type Input = {
  language: string;
};

type Output = Array<any>;
