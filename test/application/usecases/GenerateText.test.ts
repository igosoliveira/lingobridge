import dotenv from "dotenv";

import { GenerateText } from "../../../src/application/usecases/GenerateText";
import { OpeniaGateway } from "../../../src/infrastructure/gateways/OpeniaGateway";

describe("genetare text", () => {
  test("should genetare text end return title and text", async () => {
    dotenv.config({ path: ".env" });

    const openiaGateway = new OpeniaGateway();
    const generateText = new GenerateText(openiaGateway);

    const text = await generateText.execute({ language: "en" });

    console.log(text)
  });
});
