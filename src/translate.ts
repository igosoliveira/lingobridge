import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import MongoDB from "./infrastructure/repositories/mongodb/mongodb";
import { TranslateTexts } from "./application/usecases/main/TranslateTexts";

MongoDB.connect();

const languages = ["ar-AE","pt-BR","ru-RU","cmn-CN","de-DE", "es-ES", "it-IT", "fr-FR", "ja-JP","ko-KR",]

async function main() {

  for(let language of languages){
    await TranslateTexts.execute("en-US",language);
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



