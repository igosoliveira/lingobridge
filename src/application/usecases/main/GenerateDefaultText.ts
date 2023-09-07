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

export class GenerateDefaultText {
  static async createLanguage(language: string) {
    const languageMongoRepository = new LanguageMongoRepository();
    const saveLanguage = new SaveLanguage(languageMongoRepository);
    const languageCreated = await saveLanguage.execute({ code: language });
    return languageCreated;
  }

  static async createText(language: string) {
    const openiaGateway = new OpeniaGateway();
    const generateText = new GenerateText(openiaGateway);
    const textGeneration = await generateText.execute({ language });
    return textGeneration;
  }

  static async checkSimilarity(language: string, title: string, content: string) {
    const stringSimilarityGateway = new StringSimilarityGateway();
    const textMongoRepository = new TextMongoRepository();

    const checkSimilarity = new CheckSimilarity(
      stringSimilarityGateway,
      textMongoRepository
    );
    const similarity = await checkSimilarity.execute({ language, title, content });
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
    audioUrl: string
  ) {
    const textMongoRepository = new TextMongoRepository();
    const saveText = new SaveText(textMongoRepository);
    const textCreated = await saveText.execute({
      language_id: language,
      title: title,
      content: content,
      audio_url: audioUrl,
    });
    return textCreated;
  }

  static async execute(language: string) {
    try {
      console.log("starting text creation...");

      const textGeneration = await GenerateDefaultText.createText(language);
      console.log("Text generated:", textGeneration);

      const similarity = await GenerateDefaultText.checkSimilarity(
        language,
        textGeneration.title,
        textGeneration.content
      );
      console.log("similarity generated:", similarity);

      if (similarity) {
        throw Error("ERROR similarity text");
      }

      const languageCreated = await GenerateDefaultText.createLanguage(language);
      console.log("Language created:", languageCreated);

      process.stdout.write("Generating audio ");
      const audioUrl = await GenerateDefaultText.createAudio(
        language,
        textGeneration.title,
        textGeneration.content
      );
      console.log("Audio saved:", audioUrl);

      process.stdout.write("Saving text ");
      const textCreated = await GenerateDefaultText.saveText(
        language,
        textGeneration.title,
        textGeneration.content,
        audioUrl
      );
      return textCreated
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
}
