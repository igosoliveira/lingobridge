import { AudioStream } from "aws-sdk/clients/polly";
import { AudioGeneratorGateway } from "../../../application/gateways/AudioGeneratorGateway";
import { AWS } from "../../cloud/Aws";

const polly = new AWS.Polly();

export class PollyService implements AudioGeneratorGateway {
  async describeVoices(language: string): Promise<string | undefined> {
    const params = {
      LanguageCode: language,
    };

    const { Voices } = await polly.describeVoices(params).promise();
    const voiceReponse = Voices ?? [];
    const voice = voiceReponse.find((voice) =>
      voice.SupportedEngines?.includes("standard")
    );

    return voice?.Id;
  }

  async generatorAudio(
    language: string,
    text: string,
    voiceId?: string
  ): Promise<any> {
    const voice = await this.describeVoices(language);

    const params = {
      Text: text,
      OutputFormat: "mp3",
      VoiceId: voice || "Joanna",
      LanguageCode: language ?? "en-US",
    };

    const { AudioStream } = await polly.synthesizeSpeech(params).promise();

    return AudioStream;
  }
}

export default PollyService;
