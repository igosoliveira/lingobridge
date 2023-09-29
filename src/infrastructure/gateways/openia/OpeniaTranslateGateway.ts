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
          content: `translate title ${title} and text ${content} to ${language} and return with this structure {title:"", content:""}. the return must be a valid JSON`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const textEnglish = (completion.choices[0].message.content as string)
    const text = JSON.parse(JSON.parse(JSON.stringify(textEnglish)));
    return text;
  }
}
