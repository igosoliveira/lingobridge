import { AudioGeneratorGateway } from "../gateways/AudioGenerationGateway"

export class GenerateAudio {
    constructor(readonly audioGeneratorGateway: AudioGeneratorGateway) {
    }

    async execute(input: Input): Promise<Output> {
        return this.audioGeneratorGateway.generator(input.language, input.text)
    }
}

type Input = {
    text: string,
    language: string
}

type Output = Buffer
