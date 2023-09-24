import UUID from "../id/uuid";

export class Text {
  id: string;
  title: string;
  content: string;
  audio_url: string | null;
  language_id: string;
  subject_id: string;
  created_at: Date;
  updated_at: Date | null = null;

  constructor(
    id: string,
    title: string,
    content: string,
    audio_url: string | null,
    language_id: string,
    subject_id: string,
    created_at: Date,
    updated_at: Date | null = null
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.audio_url = audio_url;
    this.language_id = language_id;
    this.subject_id = subject_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create(
    title: string,
    content: string,
    audio_url: string | null,
    language_id: string,
    subject_id: string
  ) {
    const idText = UUID.create();
    const currentTime = new Date();
    return new Text(
      idText,
      title,
      content,
      audio_url,
      language_id,
      subject_id,
      currentTime,
      currentTime
    );
  }
}
