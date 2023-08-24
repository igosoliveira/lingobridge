export interface AudioRepository{
    save(audio: Buffer, name:string):void;
    getUrl(title: string):string
}