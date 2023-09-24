import { Phrases } from "../../../domain/phrases/Phrases";
import { PhrasesRepository } from "../../repositories/PhrasesRepository";

export class GetPhrasesByTranslation {
  constructor(readonly phrasesRepository: PhrasesRepository) {}

  async execute(input: Input): Promise<Output> {
    return this.phrasesRepository.getAlByTranslation(input.translationId);
  }
}

type Input = {
  translationId: string;
};

type Output =  Promise<Phrases[] | null>;
