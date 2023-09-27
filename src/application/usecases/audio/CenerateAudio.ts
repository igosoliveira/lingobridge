import { AudioGeneratorGateway } from "../../gateways/AudioGeneratorGateway";
import { AudioRepository } from "../../repositories/AudioRepository";

export class GenerateAudio {
  constructor(
    readonly audioGeneratorGateway: AudioGeneratorGateway,
    readonly audioRepository: AudioRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    try {
      const audio = await this.audioGeneratorGateway.generatorAudio(
        input.language,
        input.text
      );

      const url = await this.audioRepository.save(
        audio,
        input.folder,
        input.name
      );
      return url;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

type Input = {
  language: string;
  text: string;
  name: string;
  folder: string;
};

type Output = any;
