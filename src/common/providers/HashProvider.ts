import { compare, genSalt, hash } from "bcrypt";
import { injectable } from "tsyringe";

@injectable()
class HashProvider {
    public async generateHash(password: string) {
        const saltRounder = 10
        const salt = await genSalt(saltRounder);
        return await hash(password, salt);
    }

    public async compare(password: string, hash: string) {
        return await compare(password, hash);
    }
}

export default HashProvider;