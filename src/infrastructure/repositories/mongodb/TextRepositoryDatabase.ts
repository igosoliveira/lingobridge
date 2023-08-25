import { TextRepository } from "../../../application/repositories/TextRepository";
import { Text } from "../../../domain/text/Text";
import TextModel from "./model/TextModel";

export class TextRepositoryDatabase implements TextRepository {
  save(text: Text): Promise<Text> {
    return TextModel.create(text);
  }
  getAll(language: string): Promise<Text[]> {
    return TextModel.find({ language_id: language });
  }
}