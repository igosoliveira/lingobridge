import { Language } from "../../domain/language/Language";

export interface LanguageRepository {
  findById(idLanguage: String): Promise<Language>;
  save(language: Language): Promise<void>;
}
