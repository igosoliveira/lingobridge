import { Translation } from "../../../domain/translation/Translation";
import { PhrasesRepository } from "../../repositories/PhrasesRepository";
import { TextRepository } from "../../repositories/TextRepository";
import { TranslatorRepository } from "../../repositories/TranslatorRepository";

export class GetTranslation {
  constructor(
    readonly translatorRepository: TranslatorRepository,
    readonly textRepository: TextRepository,
    readonly phrasesRepository: PhrasesRepository

  ) {}

  async execute(input: Input): Promise<Output> {
    const translations: Translation[] = await this.translatorRepository.getAllByLanguage(
      input.fromLanguage,
      input.toLanguage
    );
    const response = [];

    for (const translation of translations) {
      const { source_id: sourceId, translation_id: translationId, phrases_id: phrasesId } =
        translation;

      const sourceText = await this.textRepository.findById(sourceId, input.fromLanguage);
      const translatedText = await this.textRepository.findById(translationId,  input.toLanguage);
      const phrases = await this.phrasesRepository.findById(phrasesId)

      response.push({
        id: translation.id,
        phrases: phrases?.phrases,
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
