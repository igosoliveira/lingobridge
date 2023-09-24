import { PhrasesRepository } from "../../repositories/PhrasesRepository";
import { Phrases } from "../../../domain/phrases/Phrases";

export class SavePhrases {
  constructor(readonly PhrasesRepository: PhrasesRepository) {}

  async execute(input: Input): Promise<Output> {
    const phrases = Phrases.create(input.phrases);

    await this.PhrasesRepository.save(phrases);

    return phrases;
  }
}

type Input = {
  phrases: Array<Object>[];
};

type Output = {
  id: string;
  phrases: Array<Object>[];
  created_at: Date;
  updated_at: Date | null;
};
