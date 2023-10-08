import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });
import MongoDB from "../../infrastructure/repositories/mongodb/mongodb";
import { Translate } from "../../application/usecases/main/Translate";
import { languages } from "./languages";

MongoDB.connect();

async function main() {
  for (let language of languages) {
    await Translate.execute("en-US", language);
  }
}

main();
