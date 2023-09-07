import { TranslatorRepository } from "../../../application/repositories/TranslatorRepository";
import { Translation } from "../../../domain/translation/Translation";
import TranslationModel from "./model/TranslationModel";

export class TranslatorMongoRepository  implements TranslatorRepository{
   async save(translation: Translation): Promise<void>{
        await TranslationModel.create(translation)
    }
}
