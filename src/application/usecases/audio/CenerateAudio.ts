import { AudioGeneratorGateway } from "../../gateways/AudioGeneratorGateway";

export class GenerateAudio {
  constructor(readonly audioGeneratorGateway: AudioGeneratorGateway) {}

  async execute(input: Input): Promise<Output> {
    const audio = await this.audioGeneratorGateway.generatorAudio(
      input.language,
      input.text
    );

    return audio;
  }
}

type Input = {
  language: string;
  text: string;
};

type Output = any;
