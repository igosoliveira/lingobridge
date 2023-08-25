import UUID from "../id/uuid";

export class Language {
  id: string;
  code: string;
  created_at: Date;
  updated_at: Date;

  constructor(id: string, code: string, created_at: Date, updated_at: Date) {
    this.id = id;
    this.code = code;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create(code: string) {
    const idLanguage = UUID.create();
    const currentTime = new Date();
    return new Language(idLanguage, code, currentTime, currentTime);
  }
}
