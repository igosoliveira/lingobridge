import { GetTexts } from "../application/usecases/text/GetTexts";
import { TextMongoRepository } from "../infrastructure/repositories/mongodb/TextMongoRepository";

const textRepository = new TextMongoRepository();
const getTextsUseCase = new GetTexts(textRepository);

export  { getTextsUseCase };
