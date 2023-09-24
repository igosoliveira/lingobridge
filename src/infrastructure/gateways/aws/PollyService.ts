import { AudioStream } from "aws-sdk/clients/polly";
import { AudioGeneratorGateway } from "../../../application/gateways/AudioGeneratorGateway";
import { AWS } from "../../cloud/Aws";

const polly = new AWS.Polly();

export class PollyService implements AudioGeneratorGateway {
  async describeVoices(language: string): Promise<any> {
    const params = {
      LanguageCode: language,
    };

    const { Voices } = await polly.describeVoices(params).promise();
    const voiceReponse = Voices ?? [];
    const voice = voiceReponse.find(
      (voice) =>
        voice.SupportedEngines?.includes("standard") ||
        voice.SupportedEngines?.includes("neural")
    );

    return { voice: voice?.Id, engine: voice?.SupportedEngines};
  }

  async generatorAudio(language: string, text: string): Promise<any> {
    const { voice, engine } = await this.describeVoices(language);

    if (!voice) {
      throw "voice error";
    }

    const params = {
      Engine: engine[0],
      Text: text,
      OutputFormat: "mp3",
      VoiceId: voice,
      LanguageCode: language ?? "en-US",
    };

    const { AudioStream } = await polly.synthesizeSpeech(params).promise();

    return AudioStream;
  }
}

export default PollyService;
