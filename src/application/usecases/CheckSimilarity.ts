import { TextSimilarityGateway } from "../gateways/TextSimilarityGateway"

export class CheckSimilarity {

    constructor(readonly textSimilarityGateway: TextSimilarityGateway) {
    }

    execute(input: Input): Output {
        const MAXIMUM_SIMILARITY: Number = 0.6
        const similatity = this.textSimilarityGateway.calculate(input.text1, input.text2)
        return similatity > MAXIMUM_SIMILARITY;
    }

}


type Input = {
    text1: string
    text2: string
}

type Output = boolean
