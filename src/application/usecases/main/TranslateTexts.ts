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
import { OpeniaPhrasesGateway } from "../../../infrastructure/gateways/openia/OpeniaPhrasesGateway";
import { PhrasesMongoRepository } from "../../../infrastructure/repositories/mongodb/PhrasesMongoRepository";
import { SavePhrases } from "../phrases/SavePhrases";

export class TranslateTexts {
  static async generatePhrases(
    text: string,
    toLanguage: string,
    fromLanguage: string
  ) {
    const openiaPhrasesGateway = new OpeniaPhrasesGateway();
    return openiaPhrasesGateway.generate(text, toLanguage, fromLanguage);
  }

  static async savePhrases(phrases: Array<Object>[], source_language_id:string, translation_language_id:string) {
    const phrasesMongoRepository = new PhrasesMongoRepository();
    const savePhrases = new SavePhrases(phrasesMongoRepository);
    return savePhrases.execute({ phrases, source_language_id, translation_language_id });
  }

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
    audioUrl: string | null,
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
    source_id: string,
    translation_id: string,
    source_language_id: string,
    translation_language_id: string,
    phrases_id: string
  ) {
    const translatorRepository = new TranslatorMongoRepository();
    const saveTranslate = new SaveTranslation(translatorRepository);
    saveTranslate.execute({
      source_language_id,
      translation_language_id,
      source_id,
      translation_id,
      phrases_id,
    });
  }

  static async createAudio(
    fileName: string,
    language: string,
    title: string,
    content: string
  ) {
    const pollyGateway = new PollyService();
    const generateAudio = new GenerateAudio(pollyGateway);
    const audio = await generateAudio.execute({
      language: language,
      text: `${title}. ${content}`,
    });

    if(!audio){
      return null
    }

    const s3Repository = new S3Repository();
    const saveAudio = new SaveAudio(s3Repository);
    const audioUrl = await saveAudio.execute({
      audioBuffer: audio,
      name: `${language}/${fileName}`,
    });
    return audioUrl;
  }

  static async pause(segundos: number): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(resolve, segundos * 1000));
  }

  static async execute(sourceLanguage: string, targetLanguage: string) {
    try {
      console.log(
        `[${new Date().toISOString()}] Starting the translation process from:"${sourceLanguage}" to:"${targetLanguage}"`
      );
  
      await this.createLanguage(targetLanguage);
      console.log(
        `[${new Date().toISOString()}] Language "${targetLanguage}" created successfully.`
      );
  
      const texts = await this.getUntranslatedTexts(
        sourceLanguage,
        targetLanguage
      );
  
      console.log(
        `[${new Date().toISOString()}] Found ${texts.length} text(s) in "${sourceLanguage}".`
      );
      if (texts.length < 1) {
        console.log(
          `[${new Date().toISOString()}] No text to translate. Exiting the process.`
        );
        return;
      }
  
      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        try {
          console.log(`[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Translating text: "${text.title}"`);
  
          const startTime = Date.now();
  
          const translatedText = await this.translate(
            targetLanguage,
            text.title,
            text.content
          );
  
          const translationTime = (Date.now() - startTime) / 1000;
  
          console.log(
            `[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Translation completed for "${text.title}" in ${translationTime} seconds.`
          );
          console.log(`[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Translated text:`, translatedText);
  
          console.log(`[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Generating audio...`);
          const audioStartTime = Date.now();
  
          
          const audioUrl = await this.createAudio(
            new Date().getTime().toString(),
            targetLanguage,
            translatedText.title,
            translatedText.content
          );
  
          const audioGenerationTime = (Date.now() - audioStartTime) / 1000;
  
          console.log(`[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Audio saved in ${audioGenerationTime} seconds:`, audioUrl);
  
          const translatedTextCreated = await this.saveText(
            targetLanguage,
            translatedText.title,
            translatedText.content,
            audioUrl,
            text.subject_id
          );
  
          console.log(
            `[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Text "${translatedTextCreated.title}" saved successfully.`
          );
  
          // Criar frases
          console.log(`[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Generating phrases...`);
          const phrasesStartTime = Date.now();
  
          const sentences = await this.generatePhrases(
            text.content,
            targetLanguage,
            sourceLanguage
          );
  
          const phrasesGenerationTime = (Date.now() - phrasesStartTime) / 1000;
  
          console.log(`[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Phrases created in ${phrasesGenerationTime} seconds:`, sentences);
  
          // Salvar frases
          console.log(`[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Saving phrases...`);
          const phrasesSaveStartTime = Date.now();
  
          const phrases = await this.savePhrases(sentences, sourceLanguage,targetLanguage);
  
          const phrasesSaveTime = (Date.now() - phrasesSaveStartTime) / 1000;
  
          console.log(`[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Phrases saved in ${phrasesSaveTime} seconds:`, phrases);
  
          await this.saveTranslate(
            text.id,
            translatedTextCreated.id,
            sourceLanguage,
            targetLanguage,
            phrases.id
          );
          console.log(`[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Translation for "${text.title}" saved successfully.`);
        } catch (error) {
          console.error(`[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Error during translation:`, error);
        }
  
        if (i < texts.length - 1) {
          console.log(`[${new Date().toISOString()}] Task ${i + 1}/${texts.length}: Waiting for 20 seconds before processing the next text...`);
          await this.pause(20);
        }
      }
  
      console.log(`[${new Date().toISOString()}] Translation process completed.`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] An error occurred:`, error);
    }
  }
  
}
