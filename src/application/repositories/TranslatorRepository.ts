import { Translation } from "../../domain/translation/Translation";

export interface TranslatorRepository {
  save(translation: Translation): Promise<Translation>;
  getAllByLanguage(fromLanguage: String, toLanguage: String): Promise<any>;
  getAvailableLanguages(language: String): Promise<any>;
  getMain(language: String, id: String): Promise<Translation | null>;
  getAllMain(language: String): Promise<Array<Translation>>;
  find(query: Object): Promise<Translation | null>
}
