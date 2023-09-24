import { TextRepository } from "../../repositories/TextRepository";
import { Text } from "../../../domain/text/Text";

export class SaveText {
  constructor(readonly textRepository: TextRepository) {}

  async execute(input: Input): Promise<Output> {
    const text = Text.create(
      input.title,
      input.content,
      input.audio_url,
      input.language_id,
      input.subject_id
    );

    await this.textRepository.save(text);

    return text;
  }
}

type Input = {
  language_id: string;
  title: string;
  content: string;
  audio_url: string | null;
  subject_id: string
};

type Output = {
  id: string;
  language_id: string;
  title: string;
  content: string;
  audio_url: string | null;
};
