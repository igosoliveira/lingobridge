import { AudioRepository } from "../repositories/AudioRepository"

export class SaveAudio {
    constructor(readonly audioRepository: AudioRepository) {

    }

    async execute(input: Input): Promise<Output> {
        await this.audioRepository.save(input.buffer, input.name)
        return this.audioRepository.getUrl(input.name)
    }
}

type Input = {
    buffer: Buffer
    name: string
}

type Output = String