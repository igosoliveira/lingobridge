import UUID from "../id/uuid";

export class Text {
  id: string;
  title: string;
  content: string;
  audio_url: string;
  language_id: string;

  constructor(
    id: string,
    title: string,
    content: string,
    audio_url: string,
    language_id: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.audio_url = audio_url;
    this.language_id = language_id;
  }

  static create(
    title: string,
    content: string,
    audio_url: string,
    language_id: string
  ) {
    const idText = UUID.create();
    return new Text(idText, title, content, audio_url, language_id);
  }
}
