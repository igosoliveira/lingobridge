import UUID from "../id/uuid";

export class Translation {
  id: string;
  source_text_id: string;
  translation_text_id: string;
  language_id: string;
  created_at: Date;
  updated_at: Date | null = null;


  constructor(
    id: string,
    source_text_id: string,
    translation_text_id: string,
    language_id: string,
    created_at: Date,
    updated_at: Date | null = null
  ) {
    this.id = id;
    this.source_text_id = source_text_id;
    this.translation_text_id = translation_text_id;
    this.language_id = language_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create(
    source_text_id: string,
    translation_text_id: string,
    language_id: string
  ) {
    const id = UUID.create();
    const currentTime = new Date();

    return new Translation(
      id,
      source_text_id,
      translation_text_id,
      language_id,
      currentTime,
      currentTime
    );
  }
}
