import { AudioRepository } from "../../repositories/AudioRepository";

export class SaveAudio {
  constructor(readonly audioRepository: AudioRepository) {}

  async execute(input: Input): Promise<Output> {
    const audioUrl = await this.audioRepository.save(
      input.audioBuffer,
      input.folder,
      input.name,
    );
    return audioUrl;
  }
}

type Input = {
  audioBuffer: any ;
  name: string;
  folder: string;
};

type Output = string;
