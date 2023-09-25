import { PhrasesRepository } from "../../../application/repositories/PhrasesRepository";
import PhrasesModel from "./model/phrasesModel";
import { Phrases } from "../../../domain/phrases/Phrases";

export class PhrasesMongoRepository implements PhrasesRepository {
  findById(id: String): Promise<Phrases | null> {
    return PhrasesModel.findOne({id});
  }
  save(phrases: Phrases): Promise<any> {
    return PhrasesModel.create(phrases);
  }
}
