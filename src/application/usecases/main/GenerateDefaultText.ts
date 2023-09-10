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

  static async saveText(
    language: string,
    title: string,
    content: string,
    audioUrl: string,
    subjectId:string
  ) {
    const textMongoRepository = new TextMongoRepository();
    const saveText = new SaveText(textMongoRepository);
    const textCreated = await saveText.execute({
      language_id: language,
      title: title,
      content: content,
      audio_url: audioUrl,
      subject_id: subjectId
    });
    return textCreated;
  }

  static async execute(language: string, subject: string = "") {
    try {
      console.log("starting text creation...");

      console.log("Generating text");
      const textGeneration = await this.createText(language, subject);
      console.log("Text generated:", textGeneration);

      console.log("Generating similarity");
      const similarity = await this.checkSimilarity(
        language,
        textGeneration.title,
        textGeneration.content
      );
      console.log("similarity generated:", similarity);

      if (similarity) {
        throw Error("ERROR similarity text");
      }

      console.log("Generating audio ");
      const audioUrl = await this.createAudio(
        language,
        textGeneration.title,
        textGeneration.content
      );
      console.log("Audio saved:", audioUrl);

      console.log("Creating language");
      const languageCreated = await this.createLanguage(language);
      console.log("Language created:", languageCreated);

      console.log("Creating subject");
      const subjectCreated = await this.createSubject(subject);
      console.log("Subject created:", subjectCreated);


      console.log("Saving text ");
      const textCreated = await this.saveText(
        language,
        textGeneration.title,
        textGeneration.content,
        audioUrl,
        subjectCreated.id
      );
      console.log("Text saved:", textCreated);

      return textCreated;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
}
