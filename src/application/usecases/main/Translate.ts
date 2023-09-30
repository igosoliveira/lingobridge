import { saveLanguageUseCase } from "../../../di/language";
import {
  findUntranslatedTextUseCase,
  saveTextUseCase,
  translateGateway,
} from "../../../di/text";
import { generateAudio } from "../../../di/audio";
import { generatePhrases, savePhrasesUseCase } from "../../../di/phrases";
import { saveTranslateUseCase } from "../../../di/translation";

export class Translate {
  static async pause(segundos: number): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(resolve, segundos * 1000));
  }

  static async execute(sourceLanguage: string, targetLanguage: string) {
    try {
      console.log("get untranslated texts");
      const texts = await findUntranslatedTextUseCase.execute({
        language: sourceLanguage,
        toLanguage: targetLanguage,
      });
      console.log(`found (${texts.length}) of language ${targetLanguage}`);

      if (texts.length < 1) {
        console.log(
          `[${new Date().toISOString()}] No text to translate. Exiting the process.`
        );
        return;
      }

      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        try {
          console.log("translating the text");
          const translatedText = await translateGateway.translate(
            targetLanguage,
            text.content,
            text.title
          );
          console.log("Translated text");

          console.log("generating audio");
          const audioUrl = await generateAudio.execute({
            language: targetLanguage,
            text: `${translatedText.title}. ${translatedText.content}`,
            name: new Date().getTime().toString(),
            folder: `texts/${targetLanguage}`,
          });
          console.log(audioUrl);
          console.log("Audio created");

          console.log("generate sentences");
          const sentences = await generatePhrases.generate(
            translatedText.content,
            targetLanguage
          );
          const newSentences = [];
          for (const sentence of sentences) {
            const audioUrl = await generateAudio.execute({
              language: targetLanguage,
              text: sentence.sentence,
              name: new Date().getTime().toString(),
              folder: `sentences/${targetLanguage}`,
            });
            newSentences.push({ ...sentence, audio: audioUrl });
          }
          const phrases = await savePhrasesUseCase.execute({
            language_id: targetLanguage,
            phrases: newSentences,
          });
          console.log(phrases);
          console.log("sentences created");

          console.log("saving text");
          const textCreated = await saveTextUseCase.execute({
            language_id: targetLanguage,
            title: translatedText.title,
            content: translatedText.content,
            audio_url: audioUrl,
            subject_id: text.subject_id,
            phrases_id: phrases.id,
          });
          console.log(textCreated);
          console.log("Text created");

          console.log("saving translation");
          const translate = await saveTranslateUseCase.execute({
            source_id: text.id,
            source_language_id: text.language_id,
            translation_id: textCreated.id,
            translation_language_id: textCreated.language_id,
            phrases_id: text.phrases_id,
            translation_phrases_id: phrases.id,
          });
          console.log(translate);
          console.log("translation created");

          const languageCreated = await saveLanguageUseCase.execute({
            code: targetLanguage,
          });
          console.log(languageCreated);
          console.log("Language created");
        } catch (error) {
          console.error(
            `[${new Date().toISOString()}] Task ${i + 1}/${
              texts.length
            }: Error during translation:`,
            error
          );
        }

        if (i < texts.length - 1) {
          await this.pause(30);
        }
      }

      console.log(
        `[${new Date().toISOString()}] Translation process completed.`
      );
    } catch (error) {
      console.error(`[${new Date().toISOString()}] An error occurred:`, error);
    }
  }
}
