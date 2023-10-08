import { Translation } from "../../domain/translation/Translation";

export interface TranslatorRepository {
  save(translation: Translation): void;
  getAllByLanguage(fromLanguage: String, toLanguage: String): Promise<any>;
  getAvailableLanguages(language: String): Promise<Array<String>>;
  getMainTranslation(
    language: String,
    source_id: String
  ): Promise<Translation | null>;
  getAllMainTranslation(language: String): Promise<Array<Translation>>;
}
