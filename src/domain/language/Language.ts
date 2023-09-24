import languageCodeToFlagAndCountry from "./hashMap";

export class Language {
  id: string;
  code: string;
  emoji: string;
  country: string;
  language: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: string,
    code: string,
    emoji: string,
    country: string,
    language: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.code = code;
    this.emoji = emoji;
    this.country = country;
    this.language= language;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create(
    code: string,
    emoji: string,
    country: string,
    language: string
  ) {
    const currentTime = new Date();
    return new Language(
      code,
      code,
      emoji,
      country,
      language,
      currentTime,
      currentTime
    );
  }

  static createFromCode(code: string) {
    if (languageCodeToFlagAndCountry.hasOwnProperty(code)) {
      const { emoji, country, language} = languageCodeToFlagAndCountry[code as keyof typeof languageCodeToFlagAndCountry];
      return new Language(code, code, emoji, country, language, new Date(), new Date());
    } else {
      throw new Error(`Código de idioma "${code}" não encontrado.`);
    }
  }
}
