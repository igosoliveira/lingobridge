import UUID from "../id/uuid";

export class Translation {
  id: string;
  text: {
    id: string;
    phrases_id: string;
    language_id: string;
  };
  translation: {
    id: string;
    phrases_id: string;
    language_id: string;
  };
  created_at: Date;
  updated_at: Date | null = null;

  constructor(
    id: string,
    text: {
      id: string;
      phrases_id: string;
      language_id: string;
    },
    translation: {
      id: string;
      phrases_id: string;
      language_id: string;
    },
    created_at: Date,
    updated_at: Date | null = null
  ) {
    this.id = id;
    this.text = text;
    this.translation = translation;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create(
    text: {
      id: string;
      phrases_id: string;
      language_id: string;
    },
    translation: {
      id: string;
      phrases_id: string;
      language_id: string;
    }
  ) {
    const id = UUID.create();
    const currentTime = new Date();

    return new Translation(id, text, translation, currentTime, currentTime);
  }
}
