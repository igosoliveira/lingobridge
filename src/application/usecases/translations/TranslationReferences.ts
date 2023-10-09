import { Translation } from "../../../domain/translation/Translation";
import { TranslatorRepository } from "../../repositories/TranslatorRepository";

export class TranslationReferences {
  constructor(readonly translatorRepository: TranslatorRepository) {}

  async execute(input: Input) {
    const sourceTranslations = await this.translatorRepository.getAllMain(
      input.from
    );
    console.log(`para traduzir (${sourceTranslations.length})`);
    let count = 0;

    for (const sourceTranslation of sourceTranslations) {
      const targetTranlation = await this.translatorRepository.getMain(
        input.to,
        sourceTranslation.text.id
      );

      if (!targetTranlation) {
        console.log("traducao nao encontrada");
        console.log(sourceTranslation);
        continue;
      }

      const newTranslation = Translation.create(
        sourceTranslation.translation,
        targetTranlation.translation
      );

      const exists = await this.translatorRepository.find({
        text: newTranslation.text,
        translation: newTranslation.translation,
      });

      if (exists) {
        console.log("traducao ja existe");
        continue;
      }

      await this.translatorRepository.save(newTranslation);
      count++;
      console.log(`${count} texto traduzido`);
    }
  }
}

type Input = {
  to: string;
  from: string;
};

type Output = Array<any>;
