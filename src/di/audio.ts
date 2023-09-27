import { GenerateAudio } from "../application/usecases/audio/CenerateAudio";
import PollyService from "../infrastructure/gateways/aws/PollyService";
import { S3Repository } from "../infrastructure/repositories/aws/S3Repository";

const pollyGateway = new PollyService();
const s3Repository = new S3Repository();
const generateAudio = new GenerateAudio(pollyGateway, s3Repository);

export { generateAudio, };
