import { Phrases } from "../../domain/phrases/Phrases";

export interface PhrasesRepository {
  save(translation: Phrases): Promise<Phrases>;
  findById(id: String): Promise<Phrases | null>;
}
