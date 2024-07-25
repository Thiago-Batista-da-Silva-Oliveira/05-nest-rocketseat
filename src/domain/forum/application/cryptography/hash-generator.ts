export abstract class HasheGenerator {
    abstract hash(plaintext: string): Promise<string>
}