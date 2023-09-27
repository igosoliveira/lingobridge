import { SavePhrases } from "../application/usecases/phrases/SavePhrases";
import { OpeniaPhrasesGateway } from "../infrastructure/gateways/openia/OpeniaPhrasesGateway";
import { PhrasesMongoRepository } from "../infrastructure/repositories/mongodb/PhrasesMongoRepository";

const phrasesRepository = new PhrasesMongoRepository();
const savePhrasesUseCase = new SavePhrases(phrasesRepository);

const generatePhrases = new OpeniaPhrasesGateway();

export  { savePhrasesUseCase, generatePhrases }