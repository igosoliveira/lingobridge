import { LanguageRepository } from "../../../application/repositories/LanguageRepository";
import { Language } from "../../../domain/language/Language";

export class LanguageRepositoryDatabase implements LanguageRepository{
    findById(idLanguage: String): Promise<Language> {
        throw new Error("Method not implemented.");
    }
    save(language: Language): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
