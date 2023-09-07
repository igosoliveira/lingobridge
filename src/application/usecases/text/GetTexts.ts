import { TextRepository } from "../../repositories/TextRepository";
import { Text } from "../../../domain/text/Text";

export class GetTexts {
  constructor(readonly textRepository: TextRepository) {}

  async execute(input: Input): Promise<Output> {
    return this.textRepository.getAll(input.language);
  }
}

type Input = {
  language: string;
};

type Output = Text[];
