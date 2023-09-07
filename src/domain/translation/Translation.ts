import UUID from "../id/uuid";

export class Translation {
  id: string;
  source_text_id: string;
  translation_text_id: string;
  language_id: string;

  constructor(
    id: string,
    source_text_id: string,
    translation_text_id: string,
    language_id: string
  ) {
    this.id = id;
    this.source_text_id = source_text_id;
    this.translation_text_id = translation_text_id;
    this.language_id = language_id;
  }

  static create(
    source_text_id: string,
    translation_text_id: string,
    language_id: string
  ) {
    const id = UUID.create();
    return new Translation(
      id,
      source_text_id,
      translation_text_id,
      language_id
    );
  }
}
