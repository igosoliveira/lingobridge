import { SaveLanguage } from "../language/SaveLanguage";
import { SaveText } from "../text/SaveText";
import { LanguageMongoRepository } from "../../../infrastructure/repositories/mongodb/LanguageMongoRepository";
import { TextMongoRepository } from "../../../infrastructure/repositories/mongodb/TextMongoRepository";
import { OpeniaTranslateGateway } from "../../../infrastructure/gateways/openia/OpeniaTranslateGateway";
import { SaveTranslation } from "../translations/SaveTranslation";
import { TranslatorMongoRepository } from "../../../infrastructure/repositories/mongodb/TranslatorMongoRepository";
import { FindUntranslatedText } from "../text/FindUntranslatedText";
import PollyService from "../../../infrastructure/gateways/aws/PollyService";
import { S3Repository } from "../../../infrastructure/repositories/aws/S3Repository";
import { SaveAudio } from "../audio/SaveAudio";
import { GenerateAudio } from "../audio/CenerateAudio";

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

  static async getUntranslatedTexts(language: string, toLanguage: string) {
    const textMongoRepository = new TextMongoRepository();
    const getTexts = new FindUntranslatedText(textMongoRepository);
    return getTexts.execute({ language, toLanguage });
  }

  static async saveText(
    language: string,
    title: string,
    content: string,
    audioUrl: string,
    subjectId: string
  ) {
    const textMongoRepository = new TextMongoRepository();
    const saveText = new SaveText(textMongoRepository);
    return saveText.execute({
      language_id: language,
      title: title,
      content: content,
      audio_url: audioUrl,
      subject_id: subjectId,
    });
  }

  static async saveTranslate(
    source_text_id: string,
    translation_text_id: string,
    source_text_language_id: string,
    translation_text_language_id: string
  ) {
    const translatorRepository = new TranslatorMongoRepository();
    const saveTranslate = new SaveTranslation(translatorRepository);
    saveTranslate.execute({
      source_text_language_id,
      translation_text_language_id,
      source_text_id,
      translation_text_id,
    });
  }
  
  static async createAudio(language: string, title: string, content: string) {
    const pollyGateway = new PollyService();
    const generateAudio = new GenerateAudio(pollyGateway);
    const audio = await generateAudio.execute({
      language: language,
      text: `${title}${content}`,
    });

    const s3Repository = new S3Repository();
    const saveAudio = new SaveAudio(s3Repository);
    const audioUrl = await saveAudio.execute({
      audioBuffer: audio,
      name: title,
      language: language,
    });
    return audioUrl;
  }


  static async pause(segundos: number): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(resolve, segundos * 1000));
  }

  static async execute(sourceLanguage: string, targetLanguage: string) {
    console.log(
      `Starting translation process for language: "${targetLanguage}"`
    );

    await this.createLanguage(targetLanguage);
    console.log(`Language "${targetLanguage}" created.`);

    const texts = await this.getUntranslatedTexts(
      sourceLanguage,
      targetLanguage
    );

    console.log(`Found ${texts.length} text(s) in "${sourceLanguage}".`);

    for (const text of texts) {
      try {
        console.log(`Translating text: "${text.title}"`);

        const translatedText = await this.translate(
          targetLanguage,
          text.title,
          text.content
        );

        console.log(`Translation complete for "${text.title}"`);
        console.log(translatedText);

        console.log("Generating audio ");
        const audioUrl = await this.createAudio(
          targetLanguage,
          translatedText.title,
          translatedText.content
        );
        console.log("Audio saved:", audioUrl);

        const translatedTextCreated = await this.saveText(
          targetLanguage,
          translatedText.title,
          translatedText.content,
          audioUrl,
          text.subject_id,
        );

        console.log(`Text "${translatedTextCreated.title}" saved.`);

        await this.saveTranslate(
          text.id,
          translatedTextCreated.id,
          sourceLanguage,
          targetLanguage
        );
        console.log(`Translation for "${text.title}" saved.`);
        console.log("Translation process completed.");
      } catch (error) {
        console.log(error);
      }

      await this.pause(20);
    }
  }
}
