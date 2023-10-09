import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import MongoDB from "../../infrastructure/repositories/mongodb/mongodb";
import { CartesianTranslation } from "../../application/usecases/main/cartesianTranslation";
import { languages } from "./languages";

MongoDB.connect();

async function main() {
  await CartesianTranslation.execute(["es-ES"], ["pt-BR"]);
}

main();
