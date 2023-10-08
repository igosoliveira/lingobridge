import { TextGeneratorGateway } from "../../../application/gateways/TextGeneratorGateway";
import OpenAI from "openai";
const he = require("he");

export class OpeniaGateway implements TextGeneratorGateway {
  openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generate(
    language: string,
    subject: string = ""
  ): Promise<{ title: string; content: string }> {
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `create an interesting short text in ${language} ${
            subject ? "about " + subject : ""
          }. and return with this structure {title:"", content:""}. the return must be a valid JSON`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const textEnglish = (completion.choices[0].message.content as string)
      .replace(/\n/g, "")
      .replace(/\\./g, "")
      .replace(/\.(\w)/g, ". $1");

    const text = JSON.parse(JSON.parse(JSON.stringify(textEnglish)));

    return text;
  }
}
