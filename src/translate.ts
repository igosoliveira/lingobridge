import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import MongoDB from "./infrastructure/repositories/mongodb/mongodb";
import { TranslateTexts } from "./application/usecases/main/TranslateTexts";

MongoDB.connect();

const languages = ["de-DE", "es-ES", "it-IT", "fr-FR"]
async function main() {

  for(let language of languages){
    await TranslateTexts.execute("en-US",language);
  }

}

main();
