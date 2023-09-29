import OpenAI from "openai";
import { PhrasesGeneratorGateway } from "../../../application/gateways/PhrasesGeneratorGateway";
const he = require("he");

export class OpeniaPhrasesGateway implements PhrasesGeneratorGateway {
  openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generate(
    text: string,
    fromLanguage: string
  ): Promise<any>{
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `create a json with an array of objects with all text sentences in ${fromLanguage} , where each sentence is an item in the array, structure {sentences:[{sentence:",", audio:""}, ...]}. sentences should be very short
          The text is as follows: ${text}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const result = he
      .decode(completion.choices[0].message.content as string)
      .replace(/\n/g, "")


    return JSON.parse(result).sentences;
  }
}
