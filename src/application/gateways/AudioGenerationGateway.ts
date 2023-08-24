export interface AudioGeneratorGateway {
    generator(language: string, text: string): Promise<Buffer>
}

