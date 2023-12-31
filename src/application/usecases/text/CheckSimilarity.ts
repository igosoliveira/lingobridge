import { TextSimilarityGateway } from "../../gateways/TextSimilarityGateway";
import { TextRepository } from "../../repositories/TextRepository";

export class CheckSimilarity {
  constructor(
    readonly textSimilarityGateway: TextSimilarityGateway,
    readonly textRepository: TextRepository
  ) {}

  async execute(input: Input): Output {
    const MAXIMUM_SIMILARITY: Number = 0.6;
    let isSimilarity: boolean = false;

    const textFound = await this.textRepository.findOne({
      title: input.title,
      content: input.content,
    });
    const texts = await this.textRepository.getAll(input.language);

    for (let textDatabase of texts) {
      if (textFound) {
        continue;
      }
      const similarity = this.textSimilarityGateway.calculate(
        input.title,
        textDatabase.title
      );
      isSimilarity = similarity > MAXIMUM_SIMILARITY;
      if (isSimilarity) {
        console.log(`similarity: ${similarity}`);
        break;
      }
    }

    return isSimilarity;
  }
}

type Input = {
  language: string;
  title: string;
  content: string;
};

type Output = Promise<boolean>;
