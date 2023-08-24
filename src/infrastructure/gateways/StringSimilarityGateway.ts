import stringSimilarity from "string-similarity";
import { TextSimilarityGateway } from "../../application/gateways/TextSimilarityGateway";

export class StringSimilarityGateway implements TextSimilarityGateway{
    calculate(text1: string, text2: string): Number {
        return stringSimilarity.compareTwoStrings(text1, text2);
    }

}
