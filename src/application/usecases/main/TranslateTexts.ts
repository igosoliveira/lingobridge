import { SaveLanguage } from "../language/SaveLanguage";
import { SaveText } from "../text/SaveText";
import { LanguageMongoRepository } from "../../../infrastructure/repositories/mongodb/LanguageMongoRepository";
import { TextMongoRepository } from "../../../infrastructure/repositories/mongodb/TextMongoRepository";
import { OpeniaTranslateGateway } from "../../../infrastructure/gateways/openia/OpeniaTranslateGateway";
import { SaveTranslation } from "../translations/SaveTranslation";
import { TranslatorMongoRepository } from "../../../infrastructure/repositories/mongodb/TranslatorMongoRepository";
import { FindUntranslatedText } from "../text/FindUntranslatedText";

export class TranslateTexts {
  static async translate(language: string, title: string, content: string) {
    const openiaTranslateText = new OpeniaTranslateGateway();
    return openiaTranslateText.translate(language, content, title);
  }

  static async createLanguage(language: string) {
    const languageMongoRepository = new LanguageMongoRepository();
    const saveLanguage = new SaveLanguage(languageMongoRepository);
    return saveLanguage.execute({ code: language });
  }

  static async getUntranslatedTexts(language: string) {
    const textMongoRepository = new TextMongoRepository();
    const getTexts = new FindUntranslatedText(textMongoRepository);
    return getTexts.execute({ language });
  }

  static async saveText(
    language: string,
    title: string,
    content: string,
    audioUrl: string
  ) {
    const textMongoRepository = new TextMongoRepository();
    const saveText = new SaveText(textMongoRepository);
    return saveText.execute({
      language_id: language,
      title: title,
      content: content,
      audio_url: audioUrl,
    });
  }

  static async saveTranslate(
    language_id: string,
    source_text_id: string,
    translation_text_id: string
  ) {
    const translatorRepository = new TranslatorMongoRepository();
    const saveTranslate = new SaveTranslation(translatorRepository);
    saveTranslate.execute({ language_id, source_text_id, translation_text_id });
  }

  static async pause(segundos: number): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(resolve, segundos * 1000));
  }

  static async execute(targetLanguage: string) {
    try {
      const sourceLanguage = "en-US";

      console.log(
        `Starting translation process for language: "${targetLanguage}"`
      );

      await this.createLanguage(targetLanguage);
      console.log(`Language "${targetLanguage}" created.`);

      const texts = await this.getUntranslatedTexts(sourceLanguage);

      console.log(`Found ${texts.length} text(s) in "${sourceLanguage}".`);

      for (const text of texts) {
        console.log(`Translating text: "${text.title}"`);

        const translatedText = await this.translate(
          targetLanguage,
          text.title,
          text.content
        );

        console.log(`Translation complete for "${text.title}"`);
        console.log(translatedText);

        const translatedTextCreated = await this.saveText(
          targetLanguage,
          translatedText.title,
          translatedText.content,
          ""
        );

        console.log(`Text "${translatedTextCreated.title}" saved.`);

        await this.saveTranslate(
          targetLanguage,
          text.id,
          translatedTextCreated.id
        );
        console.log(`Translation for "${text.title}" saved.`);
        await this.pause(10);
      }

      console.log("Translation process completed.");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
}
