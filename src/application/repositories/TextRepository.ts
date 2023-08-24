import { Text } from "../../domain/text/Text"

export interface TextRepository {
    save(text: Text): Promise<void>
    getAll(language: string): Promise<Text[]>
}