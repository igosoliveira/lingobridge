export interface PhrasesGeneratorGateway {
  generate(
    text: string,
    toLanguage: string,
    fromLanguage: string
  ): Promise<Array<Object>[]>;
}
