import { TranslatorRepository } from "../../../application/repositories/TranslatorRepository";
import { Translation } from "../../../domain/translation/Translation";
import TranslationModel from "./model/TranslationModel";

export class TranslatorMongoRepository implements TranslatorRepository {
  getAvailableLanguages(language: string): Promise<any> {
    return TranslationModel.distinct("translation.language_id", {
      "text.language_id": language,
      "translation.language_id": { $ne: language },
    });
  }

  async getAllByLanguage(
    fromLanguage: String,
    toLanguage: String
  ): Promise<any> {
    return TranslationModel.find({
      "text.language_id": fromLanguage,
      "translation.language_id": toLanguage,
    });
  }
  async save(translation: Translation): Promise<void> {
    await TranslationModel.create(translation);
  }

  getMainTranslation(
    language: String,
    id: String
  ): Promise<Translation | null> {
    return TranslationModel.findOne({
      "text.language_id": "en-US",
      "text.id": id,
      "translation.language_id": language,
    });
  }

  getAllMainTranslation(language: String): Promise<Array<Translation>> {
    return TranslationModel.find({
      "text.language_id": "en-US",
      "translation.language_id": language,
    });
  }
}
