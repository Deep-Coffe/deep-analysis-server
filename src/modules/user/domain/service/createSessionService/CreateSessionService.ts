import IUserRepository from "@modules/user/infrastructure/repository/IUserRepository";
import { inject, injectable } from "tsyringe";
import { CreateSessionServiceInputDTO, CreateSessionServiceOutputDTO } from "./CreateSessionServiceDTO";
import BadRequestError from "@application/error/BadRequestError";
import HashProvider from "@common/providers/HashProvider";
import AuthenticateError from "@application/error/AuthenticateError";
import AuthProvider from "@common/providers/AuthProvider";

@injectable()
class CreateSessionService {
    constructor(@inject('UserRepository') private readonly _userRepository: IUserRepository,
        private readonly _hashProvider: HashProvider,
        private readonly _authProvider: AuthProvider) { }

    public async execute(data: CreateSessionServiceInputDTO): Promise<CreateSessionServiceOutputDTO> {
        const user = await this._userRepository.findByEmail(data.email);

        if (!user) throw new BadRequestError('Usuário não encontradado');

        const isMath = this._hashProvider.compare(data.password, user.props.password);

        if (!isMath) throw new AuthenticateError('Senha invalída');

        const token = this._authProvider.sing(user);

        return {
            id: user.id.toString(),
            name: user.props.name,
            token,
        };
    }
}

export default CreateSessionService;