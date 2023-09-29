import { Language } from "../../../domain/language/Language";
import { LanguageRepository } from "../../repositories/LanguageRepository";

export class GetLanguages {
  constructor(readonly languageRepository: LanguageRepository) {}

  async execute(): Promise<Output> {
    const languagesFound = await this.languageRepository.findAll();
    return languagesFound
  }
}

type Output = Array<Language | null>
