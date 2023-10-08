import { GetAvailableLanguages } from "../application/usecases/language/GetAvailableLanguages";
import { GetTranslation } from "../application/usecases/translations/GetTranslation";
import { SaveTranslation } from "../application/usecases/translations/SaveTranslation";
import { PhrasesMongoRepository } from "../infrastructure/repositories/mongodb/PhrasesMongoRepository";
import { TextMongoRepository } from "../infrastructure/repositories/mongodb/TextMongoRepository";
import { TranslatorMongoRepository } from "../infrastructure/repositories/mongodb/TranslatorMongoRepository";

const textRepository = new TextMongoRepository();
const translationRepository = new TranslatorMongoRepository();
const phrasesMongoRepository = new PhrasesMongoRepository();

const getTranslationsUseCase = new GetTranslation(translationRepository,textRepository, phrasesMongoRepository);

const translatorRepository = new TranslatorMongoRepository();
const saveTranslateUseCase = new SaveTranslation(translatorRepository);


const getAvailableLanguagesUseCase = new GetAvailableLanguages(translationRepository)

export  { getTranslationsUseCase ,saveTranslateUseCase, getAvailableLanguagesUseCase};
