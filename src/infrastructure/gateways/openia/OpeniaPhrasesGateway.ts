import OpenAI from "openai";
import { TranslatorGateway } from "../../../application/gateways/TranslatorGateway";
import { PhrasesGeneratorGateway } from "../../../application/gateways/PhrasesGeneratorGateway";
const he = require("he");

export class OpeniaPhrasesGateway implements PhrasesGeneratorGateway {
  openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generate(
    text: string,
    toLanguage: string,
    fromLanguage: string
  ): Promise<Array<Object>[]>{
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `create a json with an array of objects with all text sentences in ${fromLanguage} and ${toLanguage}, where each sentence is an item in the array, with the language being a dynamic key, structure {sentences:[{${fromLanguage}:"",${toLanguage}:""}, ...]} the array item must contain the corresponding phrases in both languages. Sentences must be short.
          The text is as follows: ${text}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const result = he
      .decode(completion.choices[0].message.content as string)
      .replace(/\\./g, "")
      .replace(/\n/g, "");

    return JSON.parse(result).sentences;
  }
}
