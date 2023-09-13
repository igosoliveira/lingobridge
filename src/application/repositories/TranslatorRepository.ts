import { Translation } from "../../domain/translation/Translation";

export interface TranslatorRepository {
  save(translation: Translation): void
  findAll(language: String): Promise<any>
}
