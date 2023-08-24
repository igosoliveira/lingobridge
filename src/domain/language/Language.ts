import UUID from "../id/uuid";

export class Language {
  id: string;
  code: string;

  constructor(id: string, code: string) {
    this.id = id;
    this.code = code;
  }

  static create(code: string) {
    const idLanguage = UUID.create();
    return new Language(idLanguage, code);
  }
}
