import { Translation } from "../../domain/translation/Translation";

export interface TranslatorRepository {
  save(tanslator: Translation): void
}
