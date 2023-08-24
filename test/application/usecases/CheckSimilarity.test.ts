import dotenv from "dotenv";
import { GetTexts } from "../../../src/application/usecases/GetTexts";
import { CheckSimilarity } from "../../../src/application/usecases/CheckSimilarity";
import { StringSimilarityGateway } from "../../../src/infrastructure/gateways/StringSimilarityGateway";

describe("genetare text", () => {
  test("should genetare text end return title and text", async () => {
    dotenv.config({ path: ".env" });

    const stringSimilarityGataway = new StringSimilarityGateway();
    const checkSimilarity = new CheckSimilarity(stringSimilarityGataway);

    const isSimilarity = checkSimilarity.execute({
      text1: "oi",
      text2: "oi animal rere rer",
    });

  });
});
