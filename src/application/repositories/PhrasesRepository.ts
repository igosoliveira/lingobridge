import { Phrases } from "../../domain/phrases/Phrases";

export interface PhrasesRepository {
  save(translation: Phrases): Promise<Phrases>;
  getAlByTranslation(translationId: String): Promise<Phrases[] | null>;
}
