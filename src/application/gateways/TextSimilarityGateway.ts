export interface TextSimilarityGateway {
    calculate(text1: string, text2: string): Number
}