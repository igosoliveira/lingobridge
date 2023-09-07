import { LanguageRepository } from "../../repositories/LanguageRepository";
import { Language } from "../../../domain/language/Language";

export class SaveLanguage {
  constructor(readonly languageRepository: LanguageRepository) {}

  async execute(input: Input): Promise<Output> {
    const language = Language.create(input.code);
    const languageFound = await this.languageRepository.findById(language.id);
    if (!languageFound) {
      await this.languageRepository.save(language);
      return { id: language.id };
    }
    return { id: languageFound.id };
  }
}

type Input = {
  code: string;
};

type Output = {
  id: string;
};
