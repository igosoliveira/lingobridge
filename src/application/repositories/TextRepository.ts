import { Text } from "../../domain/text/Text"

export interface TextRepository {
    save(text: Text): Promise<Text>
    getAll(language: string): Promise<Text[]>
}