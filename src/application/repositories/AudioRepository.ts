
export interface AudioRepository {
  save(audio: any, name: string): Promise<string>;
  getUrl(name:string):string
}
