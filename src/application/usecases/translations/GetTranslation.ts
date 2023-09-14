import { Translation } from "../../../domain/translation/Translation";
import { TextRepository } from "../../repositories/TextRepository";
import { TranslatorRepository } from "../../repositories/TranslatorRepository";

export class GetTranslation {
  constructor(
    readonly translatorRepository: TranslatorRepository,
    readonly textRepository: TextRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const translations: Translation[] = await this.translatorRepository.getAllByLanguage(
      input.fromLanguage,
      input.toLanguage
    );
    const response = [];

    for (const translation of translations) {
      const { source_text_id: sourceId, translation_text_id: translationId } =
        translation;

      const sourceText = await this.textRepository.findById(sourceId, input.fromLanguage);
      const translatedText = await this.textRepository.findById(translationId,  input.toLanguage);

      response.push({
        id: translation.id,
        text: {
          title: sourceText?.title,
          content: sourceText?.content,
          audio: sourceText?.audio_url,
          language: sourceText?.language_id,
        },
        translation: {
          title: translatedText?.title,
          content: translatedText?.content,
          language: translatedText?.language_id,
        },
      });
    }
    return response;
  }
}

type Input = {
  toLanguage: string;
  fromLanguage: string;
};

type Output = Array<any>;
