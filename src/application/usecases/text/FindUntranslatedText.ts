import { TextRepository } from "../../repositories/TextRepository";
import { Text } from "../../../domain/text/Text";

export class FindUntranslatedText {
  constructor(readonly textRepository: TextRepository) {}

  async execute(input: Input): Promise<Output> {
    return this.textRepository.findUntranslated(input.language || "en-US");
  }
}

type Input = {
  language: string;
};

type Output = Text[];
