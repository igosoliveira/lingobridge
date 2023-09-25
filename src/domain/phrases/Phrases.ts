import UUID from "../id/uuid";

export class Phrases {
  id: string;
  phrases: Array<object>[];
  source_language_id: string;
  translation_language_id: string;
  created_at: Date;
  updated_at: Date | null = null;

  constructor(
    id: string,
    phrases: Array<object>[],
    source_language_id: string,
    translation_language_id: string,
    updated_at: Date
  ) {
    this.id = id;
    this.phrases = phrases;
    this.source_language_id = source_language_id;
    this.translation_language_id = translation_language_id;
    this.created_at = new Date();
    this.updated_at = updated_at;
  }

  static create(
    phrases: Array<object>[],
    source_language_id: string,
    translation_language_id: string
  ) {
    const id = UUID.create();
    const currentTime = new Date();
    return new Phrases(
      id,
      phrases,
      source_language_id,
      translation_language_id,
      currentTime
    );
  }
}
