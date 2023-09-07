import OpenAI from "openai";
import { TranslatorGateway } from "../../../application/gateways/TranslatorGateway";
const he = require("he");

export class OpeniaTranslateGateway implements TranslatorGateway {
  openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async translate(
    language: string,
    content: string,
    title: string
  ): Promise<{ title: string; content: string }> {
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `translate the title ${title} and text ${content} to ${language} and returns ausing JSON format, with the structure {title:"", content:""}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const textEnglish = he
      .decode(completion.choices[0].message.content as string)
      .replace(/\\./g, "")
      .replace(/\n/g, "");

    return JSON.parse(textEnglish);
  }
}
