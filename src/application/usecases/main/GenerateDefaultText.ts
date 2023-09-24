import { GenerateAudio } from "../audio/CenerateAudio";
import { CheckSimilarity } from "../text/CheckSimilarity";
import { GenerateText } from "../text/GenerateText";
import { SaveAudio } from "../audio/SaveAudio";
import { SaveLanguage } from "../language/SaveLanguage";
import { SaveText } from "../text/SaveText";
import PollyService from "../../../infrastructure/gateways/aws/PollyService";
import { StringSimilarityGateway } from "../../../infrastructure/gateways/libraries/StringSimilarityGateway";
import { OpeniaGateway } from "../../../infrastructure/gateways/openia/OpeniaGateway";
import { S3Repository } from "../../../infrastructure/repositories/aws/S3Repository";
import { LanguageMongoRepository } from "../../../infrastructure/repositories/mongodb/LanguageMongoRepository";
import { TextMongoRepository } from "../../../infrastructure/repositories/mongodb/TextMongoRepository";
import { SubjectMongoRepository } from "../../../infrastructure/repositories/mongodb/SubjectMongoRepository";
import { SaveSubject } from "../subject/Subject";

export class GenerateDefaultText {
  static async createSubject(subject: string) {
    const SubjectRepository = new SubjectMongoRepository();
    const saveSubject = new SaveSubject(SubjectRepository);
    const subjectCreated = await saveSubject.execute({ subject });
    return subjectCreated;
  }

  static async createLanguage(language: string) {
    const languageMongoRepository = new LanguageMongoRepository();
    const saveLanguage = new SaveLanguage(languageMongoRepository);
    const languageCreated = await saveLanguage.execute({ code: language });
    return languageCreated;
  }

  static async createText(language: string, subject: string = "") {
    const openiaGateway = new OpeniaGateway();
    const generateText = new GenerateText(openiaGateway);
    const textGeneration = await generateText.execute({ language, subject });
    return textGeneration;
  }

  static async checkSimilarity(
    language: string,
    title: string,
    content: string
  ) {
    const stringSimilarityGateway = new StringSimilarityGateway();
    const textMongoRepository = new TextMongoRepository();

    const checkSimilarity = new CheckSimilarity(
      stringSimilarityGateway,
      textMongoRepository
    );
    const similarity = await checkSimilarity.execute({
      language,
      title,
      content,
    });
    return similarity;
  }

  static async createAudio(fileName: string, language: string, string: string) {

    const pollyGateway = new PollyService();
    const generateAudio = new GenerateAudio(pollyGateway);
    const audio = await generateAudio.execute({
      language: language,
      text: string,
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

  static async saveText(
    language: string,
    title: string,
    content: string,
    audioUrl: string | null,
    subjectId: string
  ) {
    const textMongoRepository = new TextMongoRepository();
    const saveText = new SaveText(textMongoRepository);
    const textCreated = await saveText.execute({
      language_id: language,
      title: title,
      content: content,
      audio_url: audioUrl,
      subject_id: subjectId,
    });
    return textCreated;
  }

  static async execute(language: string, subject: string = "") {
    try {
      const startTime = new Date();
  
      console.log(`[${new Date().toISOString()}] Starting text creation...`);
  
      const textGenerationStartTime = new Date();
      console.log(`[${textGenerationStartTime.toISOString()}] Generating text`);
      const textGeneration = await this.createText(language, subject);
      const textGenerationEndTime = new Date();
      const textGenerationTime = textGenerationEndTime.getTime() - textGenerationStartTime.getTime();
      console.log(`[${textGenerationEndTime.toISOString()}] Text generated in ${textGenerationTime} ms:`, textGeneration);
  
      const similarityStartTime = new Date();
      console.log(`[${similarityStartTime.toISOString()}] Generating similarity`);
      const similarity = await this.checkSimilarity(
        language,
        textGeneration.title,
        textGeneration.content
      );
      const similarityEndTime = new Date();
      const similarityTime = similarityEndTime.getTime() - similarityStartTime.getTime();
      console.log(`[${similarityEndTime.toISOString()}] Similarity generated in ${similarityTime} ms:`, similarity);
  
      if (similarity) {
        throw Error("ERROR similarity text");
      }
  
      const audioGenerationStartTime = new Date();
      console.log(`[${audioGenerationStartTime.toISOString()}] Generating audio`);
      const audioUrl = await this.createAudio(
        new Date().getTime().toString(),
        language,
        `${textGeneration.title}.${textGeneration.content}`
      );
      const audioGenerationEndTime = new Date();
      const audioGenerationTime = audioGenerationEndTime.getTime() - audioGenerationStartTime.getTime();
      console.log(`[${audioGenerationEndTime.toISOString()}] Audio saved in ${audioGenerationTime} ms:`, audioUrl);
  
      const languageCreationStartTime = new Date();
      console.log(`[${languageCreationStartTime.toISOString()}] Creating language`);
      const languageCreated = await this.createLanguage(language);
      const languageCreationEndTime = new Date();
      const languageCreationTime = languageCreationEndTime.getTime() - languageCreationStartTime.getTime();
      console.log(`[${languageCreationEndTime.toISOString()}] Language created in ${languageCreationTime} ms:`, languageCreated);
  
      const subjectCreationStartTime = new Date();
      console.log(`[${subjectCreationStartTime.toISOString()}] Creating subject`);
      const subjectCreated = await this.createSubject(subject);
      const subjectCreationEndTime = new Date();
      const subjectCreationTime = subjectCreationEndTime.getTime() - subjectCreationStartTime.getTime();
      console.log(`[${subjectCreationEndTime.toISOString()}] Subject created in ${subjectCreationTime} ms:`, subjectCreated);
  
      const textSavingStartTime = new Date();
      console.log(`[${textSavingStartTime.toISOString()}] Saving text`);
      const textCreated = await this.saveText(
        language,
        textGeneration.title,
        textGeneration.content,
        audioUrl,
        subjectCreated.id
      );
      const textSavingEndTime = new Date();
      const textSavingTime = textSavingEndTime.getTime() - textSavingStartTime.getTime();
      console.log(`[${textSavingEndTime.toISOString()}] Text saved in ${textSavingTime} ms:`, textCreated);
  
      const endTime = new Date();
      const totalTime = endTime.getTime() - startTime.getTime();
      console.log(`[${endTime.toISOString()}] All tasks completed in ${totalTime} ms`);
  
      return textCreated;
    } catch (error) {
      console.error(`[${new Date().toISOString()}] An error occurred:`, error);
    }
  }
  
}
