import { PhrasesRepository } from "../../repositories/PhrasesRepository";
import { Phrases } from "../../../domain/phrases/Phrases";

export class SavePhrases {
  constructor(readonly PhrasesRepository: PhrasesRepository) {}

  async execute(input: Input): Promise<Output> {
    const phrases = Phrases.create(input.phrases, input.source_language_id, input.translation_language_id);

    await this.PhrasesRepository.save(phrases);

    return phrases;
  }
}

type Input = {
  phrases: Array<Object>[];
  source_language_id: string;
  translation_language_id: string;
};

type Output = {
  id: string;
  phrases: Array<Object>[];
  created_at: Date;
  updated_at: Date | null;
};
