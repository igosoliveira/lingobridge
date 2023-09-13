import { TranslatorRepository } from "../../../application/repositories/TranslatorRepository";
import { Translation } from "../../../domain/translation/Translation";
import TranslationModel from "./model/TranslationModel";

export class TranslatorMongoRepository implements TranslatorRepository {
  findAll(language: String): Promise<any> {
    return TranslationModel.find({ translation_text_language_id: language });
  }
  async save(translation: Translation): Promise<void> {
    await TranslationModel.create(translation);
  }
}
