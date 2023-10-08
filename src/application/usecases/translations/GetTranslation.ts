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

    const responsePromises: Promise<any>[] = translations.map(
      async (translation) => {
        const { text, translation: translator } = translation;

        const [sourceText, targetText, sourcePhrases, targetPhrases] =
          await Promise.all([
            this.textRepository.findById(text.id, input.fromLanguage),
            this.textRepository.findById(translator.id, input.toLanguage),
            this.phrasesRepository.findById(text.phrases_id),
            this.phrasesRepository.findById(translator.phrases_id),
          ]);

        const sentences: Array<object> = [];
        sourcePhrases?.sentences.forEach((phrase, index) => {
          sentences.push({
            [input.fromLanguage]: phrase,
            [input.toLanguage]: targetPhrases?.sentences[index],
          });
        });

        return {
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
        };
      }
    );

    const response = await Promise.all(responsePromises);
    return response.filter((item) => item !== null);
  }
}

type Input = {
  toLanguage: string;
  fromLanguage: string;
};

type Output = Array<any>;
