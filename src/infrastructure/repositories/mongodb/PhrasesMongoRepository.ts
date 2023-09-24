import { PhrasesRepository } from "../../../application/repositories/PhrasesRepository";
import PhrasesModel from "./model/phrasesModel";
import { Phrases } from "../../../domain/phrases/Phrases";

export class PhrasesMongoRepository implements PhrasesRepository {
  getAlByTranslation(translationId: String): Promise<Phrases[]> {
    return PhrasesModel.find({translation_id: translationId});
  }
  save(phrases: Phrases): Promise<any> {
    return PhrasesModel.create(phrases);
  }
}
