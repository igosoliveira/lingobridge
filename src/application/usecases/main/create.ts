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
  static async execute(language: string = `en-US`, subject: string = "") {
    try {
      const totalTasks = 8; // Total de tarefas no processo
      let currentTask = 0; // Tarefa atual

      const logProgress = () => {
        return`[${new Date().toISOString()}] [${currentTask}/${totalTasks}] `;
      };

      console.log(`====================================`);
      console.log(`Starting Text Generation Process`);
      console.log(`====================================`);

      currentTask++;

      console.log(`${logProgress()}Generating text...`);
      const textGeneration = await generateTextUseCase.execute({
        language,
        subject,
      });
      console.log(`Text generation successful.`);
      console.log(textGeneration);

      currentTask++;

      console.log(`${logProgress()}Checking similarity...`);
      const similarity = await checkSimilarityUseCase.execute({
        language,
        title: textGeneration.title,
        content: textGeneration.content,
      });
      if (similarity) {
        throw new Error(`ERROR: similar text.`);
      }
      console.log(`Similarity check passed. ${similarity}`);

      currentTask++;

      console.log(`${logProgress()}Generating audio...`);
      const audioUrl = await generateAudio.execute({
        language: language,
        text: `${textGeneration.title}. ${textGeneration.content}`,
        name: new Date().getTime().toString(),
        folder: `texts/${language}`,
      });
      console.log(`Audio generation successful.`);
      console.log(audioUrl);

      currentTask++;

      console.log(`${logProgress()}Creating Language...`);
      const languageCreated = await saveLanguageUseCase.execute({
        code: language,
      });
      console.log(`Language created successfully.`);
      console.log(languageCreated);

      currentTask++;

      console.log(`${logProgress()}Creating Subject...`);
      const subjectCreated = await saveSubjectUseCase.execute({ subject });
      console.log(`Subject created successfully.`);
      console.log(subjectCreated);

      currentTask++;

      console.log(`${logProgress()}Generating sentences...`);
      const sentences = await generatePhrases.generate(
        textGeneration.content,
        language
      );

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
      console.log(`Sentences generated successfully.`);
      console.log(newSentences);

      currentTask++;

      console.log(`${logProgress()}Saving Phrases...`);
      const phrases = await savePhrasesUseCase.execute({
        language_id: language,
        phrases: newSentences,
      });
      console.log(`Phrases saved successfully.`);
      console.log(phrases);

      currentTask++;

      console.log(`${logProgress()}Creating Text...`);
      const textCreated = await saveTextUseCase.execute({
        language_id: language,
        title: textGeneration.title,
        content: textGeneration.content,
        audio_url: audioUrl,
        subject_id: subjectCreated.id,
        phrases_id: phrases.id,
      });
      console.log(`Text created successfully.`);
      console.log(textCreated);

      currentTask++;

      console.log(`====================================`);
      console.log(`Text Generation Process Completed`);
      console.log(`====================================`);

      return { textCreated };
    } catch (error) {
      console.error(`====================================`);
      console.error(`[${new Date().toISOString()}] An error occurred:`);
      console.error(error);
      console.error(`====================================`);
      return { error };
    }
  }
}
