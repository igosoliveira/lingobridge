import { TextRepository } from "../../../application/repositories/TextRepository";
import { Text } from "../../../domain/text/Text";

export class TextRepositoryDatabase implements TextRepository {
    save(text: Text): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAll(language: string): Promise<Text[]> {
        throw new Error("Method not implemented.");
    }
}
