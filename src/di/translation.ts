import { GetTranslation } from "../application/usecases/translations/GetTranslation";
import { PhrasesMongoRepository } from "../infrastructure/repositories/mongodb/PhrasesMongoRepository";
import { TextMongoRepository } from "../infrastructure/repositories/mongodb/TextMongoRepository";
import { TranslatorMongoRepository } from "../infrastructure/repositories/mongodb/TranslatorMongoRepository";

const textRepository = new TextMongoRepository();
const translationRepository = new TranslatorMongoRepository();
const phrasesMongoRepository = new PhrasesMongoRepository();

const getTranslationsUseCase = new GetTranslation(translationRepository,textRepository, phrasesMongoRepository);

export  { getTranslationsUseCase };
