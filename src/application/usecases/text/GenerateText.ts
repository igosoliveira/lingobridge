import { TextGeneratorGateway } from "../../gateways/TextGeneratorGateway";

export class GenerateText {
  constructor(readonly textGeneratorGateway: TextGeneratorGateway) {}

  async execute(input: Input): Promise<Output> {
    const MIN = 250;
    const text = await this.textGeneratorGateway.generate(input.language , input.subject );
    if (text.content?.length < MIN) {
      throw Error(`ERROR text less than ${MIN} characters`);
    }
    return text;
  }
}

type Input = {
  language: string;
  subject: string
};

type Output = {
  title: string;
  content: string;
};
