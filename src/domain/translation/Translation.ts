import UUID from "../id/uuid";

export class Translation {
  id: string;
  text_id: string;
  language_id: string;

  constructor(id: string, text_id: string, language_id: string) {
    this.id = id;
    this.text_id = text_id;
    this.language_id = language_id;
  }
  static create(text_id: string, language_id: string) {
    const id = UUID.create();
    const currentTime = new Date();
    return new Translation(id, text_id, language_id);
  }
}
