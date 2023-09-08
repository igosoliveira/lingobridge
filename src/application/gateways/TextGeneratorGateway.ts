export interface TextGeneratorGateway {
  generate(language: string, subject: string): Promise<{ title: string; content: string }>;
}

