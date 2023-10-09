import languageHashmap from "../../../domain/language/hashMap";
import { TranslatorRepository } from "../../repositories/TranslatorRepository";

export class GetAvailableLanguages {
  constructor(readonly translatorRepository: TranslatorRepository) {}

  async execute(input: Input): Promise<Output> {
    const languages = await this.translatorRepository.getAvailableLanguages(
      input.language
    );
    return languages.map((language: string) => {
      return {
        ...languageHashmap[language as keyof typeof languageHashmap],
        code: language,
      };
    });
  }
}

type Input = {
  language: string;
};

type Output = Array<object>;
