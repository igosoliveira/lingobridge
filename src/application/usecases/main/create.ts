import { generateAudio } from "../../../di/audio";
import { saveLanguageUseCase } from "../../../di/language";
import { generatePhrases, savePhrasesUseCase } from "../../../di/phrases";
import { saveSubjectUseCase } from "../../../di/subject";
import {
  generateTextUseCase,
  checkSimilarityUseCase,
  saveTextUseCase,
} from "../../../di/text";

export class Create {
  static async execute(language: string = "en-US", subject: string = "") {
    try {
      console.log("generating text");
      const textGeneration = await generateTextUseCase.execute({
        language,
        subject,
      });
      console.log(textGeneration);
      console.log("Text created");

      console.log("checking similarity");
      const similarity = await checkSimilarityUseCase.execute({
        language,
        title: textGeneration.title,
        content: textGeneration.content,
      });
      if (similarity) {
        throw Error("ERROR similarity text");
      }
      console.log(similarity);
      console.log("Check similarity");

      console.log("generating audio");
      const audioUrl = await generateAudio.execute({
        language: language,
        text: `${textGeneration.title}. ${textGeneration.content}`,
        name: new Date().getTime().toString(),
        folder: `texts,${language}`,
      });
      console.log(audioUrl);
      console.log("Audio created");

      const languageCreated = await saveLanguageUseCase.execute({
        code: language,
      });
      console.log(languageCreated);
      console.log("Language created");

      const subjectCreated = await saveSubjectUseCase.execute({ subject });
      console.log(subjectCreated);
      console.log("Subject created");

      console.log("generate sentences");
      const sentences = await generatePhrases.generate(
        textGeneration.content,
        language
      );
      console.log(sentences);
      console.log("sentences created");

      const newSentences = [];
      for (const sentence of sentences) {
        const audioUrl = await generateAudio.execute({
          language: language,
          text: sentence.sentence,
          name: new Date().getTime().toString(),
          folder: `sentences/${language}`,
        });

        newSentences.push({ ...sentence, audio: audioUrl });
      }

      const phrases = await savePhrasesUseCase.execute({
        language_id: language,
        phrases: newSentences,
      });
      console.log(phrases);
      console.log("sentences created");

      const textCreated = await saveTextUseCase.execute({
        language_id: language,
        title: textGeneration.title,
        content: textGeneration.content,
        audio_url: audioUrl,
        subject_id: subjectCreated.id,
        phrases_id: phrases.id,
      });

      console.log(textCreated);
      console.log("Text created");

      return { textCreated };
    } catch (error) {
      console.error(`[${new Date().toISOString()}] An error occurred:`, error);
      return { error };
    }
  }
}
