import * as crypto from 'crypto';

const md5 = (contents: string) => crypto.createHash('md5').update(contents).digest("hex");

interface Hasher {
    hash(str: string): string;
}

class PasswordHasher implements Hasher {
    constructor(
        private hashAlgorithm : (str: string) => string
    ) {}

    hash(str: string): string {
        let hashedStr: string;
        try {
            hashedStr = this.hashAlgorithm(str);
        } catch(error) {
            throw error;
        }
        
        return hashedStr;
    }
}

const passwordHasher = new PasswordHasher(md5);

export { passwordHasher }