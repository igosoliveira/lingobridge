
export interface AudioRepository {
  save(audio: any, folder: string, name: string): Promise<string>;
  getUrl(name:string, folder:string):string
}
