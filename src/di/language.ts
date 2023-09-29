import { GetLanguages } from "../application/usecases/language/GetLanguages";
import { SaveLanguage } from "../application/usecases/language/SaveLanguage";
import { LanguageMongoRepository } from "../infrastructure/repositories/mongodb/LanguageMongoRepository";

const languageMongoRepository = new LanguageMongoRepository();
const saveLanguageUseCase = new SaveLanguage(languageMongoRepository);


const getLanguagesUsecase = new GetLanguages(languageMongoRepository)

export { languageMongoRepository, saveLanguageUseCase ,getLanguagesUsecase};
