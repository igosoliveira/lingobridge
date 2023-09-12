import { AudioRepository } from "../../../application/repositories/AudioRepository";
import { AWS } from "../../cloud/Aws";

const S3 = new AWS.S3();

export class S3Repository implements AudioRepository {
  async save(audio: Buffer, name: string): Promise<string> {
    await S3.putObject({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: `${process.env.AWS_KEY_PREFIX}/${name.replace(/ /g, "")}.mp3`,
      Body: audio,
      ACL: 'public-read'
    }).promise();
    const audioUrl = this.getUrl(name);
    return audioUrl;
  }

  getUrl(name: string): string {
    const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${
      process.env.AWS_KEY_PREFIX
    }/${name}.mp3`;
    return url;
  }
}
