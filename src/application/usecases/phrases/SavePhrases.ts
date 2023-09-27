import { PhrasesRepository } from "../../repositories/PhrasesRepository";
import { Phrases } from "../../../domain/phrases/Phrases";

export class SavePhrases {
  constructor(readonly phrasesRepository: PhrasesRepository) {}

  async execute(input: Input): Promise<Output> {
    const phrases = Phrases.create(input.language_id, input.phrases);

    await this.phrasesRepository.save(phrases);

    return phrases
  }
}

type Input = {
  language_id: string;
  phrases: Array<object>;
};

type Output = {
  id: string;
  sentences: Array<object>;
  language_id: string;
  created_at: Date;
  updated_at: Date | null;
}; 