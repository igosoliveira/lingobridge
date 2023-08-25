import { AudioStream } from "aws-sdk/clients/polly";

export interface AudioGeneratorGateway {
  generatorAudio(
    language: string,
    text: string,
    voiceId?: string
  ): Promise<any>;
}
