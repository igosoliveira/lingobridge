import { TextRepository } from "../../repositories/TextRepository";
import { Text } from "../../../domain/text/Text";

export class GetText {
  constructor(readonly textRepository: TextRepository) {}

  async execute(input: Input): Promise<Output> {
    return this.textRepository.findById(input.id, input.language);
  }
}

type Input = {
  id: string;
  language: string;
};

type Output = Text | null;
