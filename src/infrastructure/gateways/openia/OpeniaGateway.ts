import { TextGeneratorGateway } from "../../../application/gateways/TextGeneratorGateway";
import OpenAI from "openai";

export class OpeniaGateway implements TextGeneratorGateway {
  openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generate(
    language: string
  ): Promise<{ title: string; content: string }> {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: `Write interesting text in language ${language} in JSON format {title:"",content:""}` }],
      model: "gpt-3.5-turbo",
    });

    const { title, content } = JSON.parse(
      completion.choices[0].message.content as string
    );

    return {
      title: title,
      content: content.replaceAll("\n", ""),
    };
  }
}
