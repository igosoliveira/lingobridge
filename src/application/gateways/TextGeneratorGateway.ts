export interface TextGeneratorGateway {
  generate(language: string): Promise<{ title: string; content: string }>;
}

