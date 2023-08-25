import { TextGeneratorGateway } from "../gateways/TextGeneratorGateway";

export class GenerateText {
  constructor(readonly textGeneratorGateway: TextGeneratorGateway) {}

  async execute(input: Input): Promise<Output> {
    return this.textGeneratorGateway.generate(input.language);
  }
}

type Input = {
  language: string;
};

type Output = {
  title: string;
  content: string;
};
