import { Translation } from "../../../domain/translation/Translation";
import { TextRepository } from "../../repositories/TextRepository";
import { TranslatorRepository } from "../../repositories/TranslatorRepository";

export class TranslationReferences {
  constructor(
    readonly translatorRepository: TranslatorRepository,
    readonly textRepository: TextRepository
  ) {}

  async execute(input: Input) {
    const sourceMainTranslations =
      await this.translatorRepository.getAllMainTranslation(input.fromLanguage);

    for (const sourceMainTranslation of sourceMainTranslations) {
      const {
        translation_id,
        translation_language_id,
        translation_phrases_id,
        source_id,
      } = sourceMainTranslation;

      const targetMain = await this.translatorRepository.getMainTranslation(
        input.toLanguage,
        source_id
      );

      
    }
  }
}

type Input = {
  toLanguage: string;
  fromLanguage: string;
};

type Output = Array<any>;
//pegar linguagens que nao seja en-US

//interar sobre elas
//buscar colection de translate todos as traducoes {translate_language = languageFrom}
//intera
//buscar texto na languageFrom
//mudar as referencias
