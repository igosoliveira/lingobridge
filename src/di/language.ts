import { SaveLanguage } from "../application/usecases/language/SaveLanguage";
import { LanguageMongoRepository } from "../infrastructure/repositories/mongodb/LanguageMongoRepository";

const languageMongoRepository = new LanguageMongoRepository();
const saveLanguageUseCase = new SaveLanguage(languageMongoRepository);


export { languageMongoRepository, saveLanguageUseCase };
