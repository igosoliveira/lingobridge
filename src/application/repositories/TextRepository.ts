import { Text } from "../../domain/text/Text";

export interface TextRepository {
  save(text: Text): Promise<Text>;
  findOne(language: Object): Promise<Text | null>;
  getAll(language: string): Promise<Text[]>;
  findUntranslated(language: string, toLanguage: string): Promise<Text[]>;
}