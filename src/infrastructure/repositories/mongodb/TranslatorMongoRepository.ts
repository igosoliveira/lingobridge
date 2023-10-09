import { TranslatorRepository } from "../../../application/repositories/TranslatorRepository";
import { Translation } from "../../../domain/translation/Translation";
import TranslationModel from "./model/TranslationModel";

export class TranslatorMongoRepository implements TranslatorRepository {
  getAvailableLanguages(language: string): Promise<any> {
    return TranslationModel.distinct("translation.language_id", {
      "text.language_id": language,
      "translation.language_id": { $ne: language },
    }).lean();
  }

  async getAllByLanguage(
    fromLanguage: String,
    toLanguage: String
  ): Promise<any> {
    return TranslationModel.find({
      "text.language_id": fromLanguage,
      "translation.language_id": toLanguage,
    }).lean();
  }
  async save(translation: Translation): Promise<Translation> {
    return TranslationModel.create(translation);
  }

  getMain(language: String, id: String): Promise<Translation | null> {
    return TranslationModel.findOne({
      "text.language_id": "en-US",
      "text.id": id,
      "translation.language_id": language,
    }).lean();
  }

  getAllMain(language: String): Promise<Array<Translation>> {
    return TranslationModel.find({
      "text.language_id": "en-US",
      "translation.language_id": language,
    }).lean();
  }

  find(query: Object): Promise<Translation | null > {
    return TranslationModel.findOne(query).lean();
  }
}
