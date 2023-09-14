import { String } from "aws-sdk/clients/appstream";
import { Text } from "../../domain/text/Text";

export interface TextRepository {
  save(text: Text): Promise<Text>;
  findOne(language: Object): Promise<Text | null>;
  findById(id: String, language: string): Promise<Text | null>;
  getAll(language: string): Promise<Text[]>;
  findUntranslated(language: string, toLanguage: string): Promise<Text[]>;
}