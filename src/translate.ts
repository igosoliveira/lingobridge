import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import MongoDB from "./infrastructure/repositories/mongodb/mongodb";
import { TranslateTexts } from "./application/usecases/main/TranslateTexts";

MongoDB.connect();

async function main() {
  await TranslateTexts.execute("en-US","es-ES");
}

main();
