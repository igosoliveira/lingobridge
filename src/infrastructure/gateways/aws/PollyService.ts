import { AudioStream } from "aws-sdk/clients/polly";
import { AudioGeneratorGateway } from "../../../application/gateways/AudioGeneratorGateway";
import { AWS } from "../../cloud/Aws";

const polly = new AWS.Polly();

export class PollyService implements AudioGeneratorGateway {
  async generatorAudio(
    language: string,
    text: string,
    voiceId?: string
  ): Promise<any> {
    const params = {
      Text: text,
      OutputFormat: "mp3",
      VoiceId: voiceId ?? "Joanna",
      LanguageCode: language ?? "en-US",
    };

    const { AudioStream } = await polly.synthesizeSpeech(params).promise();

    return AudioStream;
  }
}

export default PollyService;
