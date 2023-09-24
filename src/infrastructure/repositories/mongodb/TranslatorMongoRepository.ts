import { TranslatorRepository } from "../../../application/repositories/TranslatorRepository";
import { Translation } from "../../../domain/translation/Translation";
import TranslationModel from "./model/TranslationModel";

export class TranslatorMongoRepository implements TranslatorRepository {  
  async getAllByLanguage(fromLanguage: String, toLanguage: String): Promise<any> {
    return TranslationModel.find({
      translation_language_id: toLanguage,
      source_language_id: fromLanguage,
    });
  }
  async save(translation: Translation): Promise<void> {
    await TranslationModel.create(translation);
  }
}
