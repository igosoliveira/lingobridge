import { GetTexts } from "../application/usecases/text/GetTexts";
import { TextMongoRepository } from "../infrastructure/repositories/mongodb/TextMongoRepository";

import { GenerateText } from "../application/usecases/text/GenerateText";
import { OpeniaGateway } from "../infrastructure/gateways/openia/OpeniaGateway";
import { FindUntranslatedText } from "../application/usecases/text/FindUntranslatedText";
import { CheckSimilarity } from "../application/usecases/text/CheckSimilarity";
import { StringSimilarityGateway } from "../infrastructure/gateways/libraries/StringSimilarityGateway";
import { SaveText } from "../application/usecases/text/SaveText";
import { OpeniaTranslateGateway } from "../infrastructure/gateways/openia/OpeniaTranslateGateway";

const textRepository = new TextMongoRepository();
const getTextsUseCase = new GetTexts(textRepository);

const findUntranslatedTextUseCase = new FindUntranslatedText(textRepository);

const textGeneratorGateway = new OpeniaGateway();
const generateTextUseCase = new GenerateText(textGeneratorGateway);

const stringSimilarityGateway = new StringSimilarityGateway();
const checkSimilarityUseCase = new CheckSimilarity(
  stringSimilarityGateway,
  textRepository
);

const textMongoRepository = new TextMongoRepository();
const saveTextUseCase = new SaveText(textMongoRepository);

const translateGateway = new OpeniaTranslateGateway();


export {
  getTextsUseCase,
  generateTextUseCase,
  saveTextUseCase,
  findUntranslatedTextUseCase,
  checkSimilarityUseCase,
  translateGateway
};
