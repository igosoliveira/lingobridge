
export interface AudioGeneratorGateway {
  generatorAudio(
    language: string,
    text: string,
  ): Promise<any>;
}
