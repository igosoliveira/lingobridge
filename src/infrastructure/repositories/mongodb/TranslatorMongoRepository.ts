import { TranslatorRepository } from "../../../application/repositories/TranslatorRepository";
import { Translation } from "../../../domain/translation/Translation";
import TranslationModel from "./model/TranslationModel";

export class TranslatorMongoRepository implements TranslatorRepository {
  getAvailableLanguages(language: string): Promise<any> {
    return TranslationModel.distinct("translation_language_id", {
      source_language_id: language,
      translation_language_id: { $ne: language },
    });
  }
  async getAllByLanguage(
    fromLanguage: String,
    toLanguage: String
  ): Promise<any> {
    return TranslationModel.find({
      translation_language_id: toLanguage,
      source_language_id: fromLanguage,
    });
  }
  async save(translation: Translation): Promise<void> {
    await TranslationModel.create(translation);
  }
}
