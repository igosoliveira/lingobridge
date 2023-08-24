export interface TextTranslatorGateway {
  translate(language: string, text: string, title: string): Promise<{ title: string; text: string }>;
}