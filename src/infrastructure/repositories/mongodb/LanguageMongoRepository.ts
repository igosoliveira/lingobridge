import { LanguageRepository } from "../../../application/repositories/LanguageRepository";
import { Language } from "../../../domain/language/Language";
import LanguageModel from "./model/LanguageModel";

export class LanguageMongoRepository implements LanguageRepository {
  findById(idLanguage: String): Promise<Language | null> {
    return LanguageModel.findOne({ id: idLanguage });
  }
  save(language: Language): Promise<Language | null> {
    return LanguageModel.create(language);
  }
}
