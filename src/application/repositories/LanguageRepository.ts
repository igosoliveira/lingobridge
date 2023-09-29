import { Language } from "../../domain/language/Language";

export interface LanguageRepository {
  findById(id: String): Promise<Language | null>;
  save(language: Language): Promise<Language | null>;
  findAll(): Promise<Array<Language | null>>;
}
