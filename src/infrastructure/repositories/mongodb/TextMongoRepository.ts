import { TextRepository } from "../../../application/repositories/TextRepository";
import { Text } from "../../../domain/text/Text";
import TextModel from "./model/TextModel";
import TranslationModel from "./model/TranslationModel";

export class TextMongoRepository implements TextRepository {
  findById(id: string, language: string): Promise<Text | null> {
    return TextModel.findOne({ id: id, language_id: language });
  }
  findOne(find: Object): Promise<Text | null> {
    return TextModel.findOne(find);
  }
  save(text: Text): Promise<Text> {
    return TextModel.create(text);
  }
  getAll(language: string): Promise<Text[]> {
    return TextModel.find({ language_id: language });
  }

  async findUntranslated(
    language: string = "en-US",
    toLanguage: string
  ): Promise<Text[]> {
    return TextModel.find({
      language_id: language,
      id: {
        $nin: await TranslationModel.distinct("text.id", {
          "translation.language_id": toLanguage,
        }),
      },
    });
  }
}
