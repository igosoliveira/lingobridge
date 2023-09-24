import { AudioGeneratorGateway } from "../../gateways/AudioGeneratorGateway";

export class GenerateAudio {
  constructor(readonly audioGeneratorGateway: AudioGeneratorGateway) {}

  async execute(input: Input): Promise<Output> {
    try {
      const audio = await this.audioGeneratorGateway.generatorAudio(
        input.language,
        input.text
      );
      return audio;
    } catch (error) {
      console.log(error);
      return null
    }
  }
}

type Input = {
  language: string;
  text: string;
};

type Output = any;
