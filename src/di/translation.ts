import { GetTranslation } from "../application/usecases/translations/GetTranslation";
import { TextMongoRepository } from "../infrastructure/repositories/mongodb/TextMongoRepository";
import { TranslatorMongoRepository } from "../infrastructure/repositories/mongodb/TranslatorMongoRepository";

const textRepository = new TextMongoRepository();
const translationRepository = new TranslatorMongoRepository();
const getTranslationsUseCase = new GetTranslation(translationRepository,textRepository);

export  { getTranslationsUseCase };
