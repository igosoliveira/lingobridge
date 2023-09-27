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
    const translations: Translation[] =
      await this.translatorRepository.getAllByLanguage(
        input.fromLanguage,
        input.toLanguage
      );
    const response = [];

    for (const translation of translations) {
      const {
        source_id: sourceId,
        translation_id: translationId,
        phrases_id: phrasesId,
        translation_phrases_id: translationPhrasesId,
      } = translation;

      const sourceText = await this.textRepository.findById(
        sourceId,
        input.fromLanguage
      );
      const targetText = await this.textRepository.findById(
        translationId,
        input.toLanguage
      );
      const sourcePhrases = await this.phrasesRepository.findById(phrasesId);
      const targetPhrases = await this.phrasesRepository.findById(
        translationPhrasesId
      );

      const sentences: Array<object> = [];
      sourcePhrases?.sentences.forEach((phrase, index) => {
        sentences.push({
          [input.fromLanguage]: phrase,
          [input.toLanguage]: targetPhrases?.sentences[index],
        });
      });

      response.push({
        language: {
          sourceLanguage: sourceText?.language_id,
          targetLanguage: targetText?.language_id,
        },
        phrases: sentences,
        text: {
          title: sourceText?.title,
          content: sourceText?.content,
          audio: sourceText?.audio_url,
        },
        translation: {
          title: targetText?.title,
          content: targetText?.content,
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
