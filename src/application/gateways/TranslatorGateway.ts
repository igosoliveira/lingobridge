export interface TranslatorGateway {
  translate(language: string, content: string, title: string): Promise<{ title: string; content: string }>;
}