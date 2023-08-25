
export interface AudioRepository {
  save(audio: any, name: string, language: string): Promise<string>;
  getUrl(name: string, language: string): string;
}
