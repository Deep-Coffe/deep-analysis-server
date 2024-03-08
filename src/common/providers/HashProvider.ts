import { injectable } from "tsyringe";

@injectable()
class HashProvider {
    public async generateHash(password: string) {
        return password;
    }

    public async compare(password: string, hash: string) {
        return password === hash;
    }
}

export default HashProvider;