import UUID from "../id/uuid";

export class Phrases {
  id: string;
  sentences: Array<object>; 
  language_id: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: string,
    sentences: Array<object>,
    language_id: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.sentences = sentences;
    this.language_id = language_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create(language_id: string, sentences: Array<object>) {
    const id = UUID.create(); 
    const currentTime = new Date();
    return new Phrases(id, sentences, language_id, currentTime, currentTime);
  }
}