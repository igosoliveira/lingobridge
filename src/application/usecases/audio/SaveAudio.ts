import { AudioRepository } from "../../repositories/AudioRepository";

export class SaveAudio {
  constructor(readonly audioRepository: AudioRepository) {}

  async execute(input: Input): Promise<Output> {
    const audioUrl = await this.audioRepository.save(
      input.audioBuffer,
      input.name,
      input.language
    );
    return audioUrl;
  }
}

type Input = {
  audioBuffer: any ;
  name: string;
  language: string;
};

type Output = string;
