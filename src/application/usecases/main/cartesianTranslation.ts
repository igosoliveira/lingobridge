import { translationReferencesUseCase } from "../../../di/translation";

export class CartesianTranslation {
  static async execute(fromLanguages: Array<string>, toLanguages: Array<string>) {
    for (const from of fromLanguages) {
      const languages = toLanguages.filter((item) => item != from);
      for (const to of languages) {
        await translationReferencesUseCase.execute({
          to,
          from: from,
        });
      }
    }
  }
}
