export abstract class HasheComparer {
    abstract compare(plaintext: string, digest: string): Promise<boolean>
}