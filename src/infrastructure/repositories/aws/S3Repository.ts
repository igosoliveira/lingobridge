import { AudioRepository } from "../../../application/repositories/AudioRepository";
import { AWS } from "../../cloud/Aws";

const S3 = new AWS.S3();

export class S3Repository implements AudioRepository {
  async save(audio: Buffer, name: string, language: string): Promise<string> {
    await S3.putObject({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: `${process.env.AWS_KEY_PREFIX}/${language}/${name}.mp3`,
      Body: audio,
    }).promise();
    const audioUrl = this.getUrl(name, language);
    return audioUrl;
  }

  getUrl(name: string, language: string): string {
    const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${
      process.env.AWS_KEY_PREFIX
    }/${language}/${name.replace(/ /g, "+")}.mp3`;
    return url;
  }
}
