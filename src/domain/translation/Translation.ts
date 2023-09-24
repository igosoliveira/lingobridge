import UUID from "../id/uuid";

export class Translation {
  id: string;
  source_id: string;
  translation_id: string;
  source_language_id: string;
  translation_language_id: string;
  phrases_id: string;
  created_at: Date;
  updated_at: Date | null = null;


  constructor(
    id: string,
    source_id: string,
    translation_id: string,
    source_language_id: string,
    translation_language_id: string,
    phrases_id: string,
    created_at: Date,
    updated_at: Date | null = null
  ) {
    this.id = id;
    this.source_id = source_id;
    this.translation_id = translation_id;
    this.source_language_id =  source_language_id;
    this.translation_language_id = translation_language_id;
    this.phrases_id = phrases_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create(
    source_id: string,
    translation_id: string,
    source_language_id: string,
    translation_language_id: string,
    phrases_id: string
    ) {
    const id = UUID.create();
    const currentTime = new Date();

    return new Translation(
      id,
      source_id,
      translation_id,
      source_language_id,
      translation_language_id,
      phrases_id,
      currentTime,
      currentTime
    );
  }
}
