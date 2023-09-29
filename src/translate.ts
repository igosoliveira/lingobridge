import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import MongoDB from "./infrastructure/repositories/mongodb/mongodb";
import { Translate } from "./application/usecases/main/Translate";

MongoDB.connect();

const languages = [
  "pt-BR",
  "es-ES",
  "it-IT",
  "fr-FR",
  "de-DE",
  "ru-RU",
  "cmn-CN",
  "ja-JP",
  "ko-KR",
  "ar-AE",
  "is-IS",
  "pl-PL",
  "ro-RO",
  "sv-SE",
  "cy-GB",
  "da-DK",
  "nl-BE",
];

async function main() {
  for (let language of languages) {
    await Translate.execute("en-US", language);
  }
}

main();

//pegar todos os textos de uma linguagem
//interar sobre cada um
//pegar as frases
//armazenar no mongo
//  collection: phrases{ id, idTranslation, phrases:[{}]}
//  adicionar o id da frase na traducao
//
