import { Translation } from "../../domain/translation/Translation";

export interface TranslatorRepository {
  save(translation: Translation): void
  getAllByLanguage(fromLanguage: String, toLanguage: String): Promise<any>
  getAvailableLanguages(language: string): Promise<Array<String>>
}
