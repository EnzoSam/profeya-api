import { IAuthTokenGenerator } from "@modules/auth/domain/users/services/auth-token-generator.interface";
import { LoginCommand } from "../commands/login.command";
import { ILoginCommandHandler } from "./login-command-handler.interface";
import { AuthorizationDto } from "@modules/auth/domain/users/dtos/authorization.dto";
import { IUserQueryRepository } from "@modules/auth/domain/repositories/users/user-query-repository";

export class LoginCommandHandler implements ILoginCommandHandler {
    
    constructor(private tokenGenerator:IAuthTokenGenerator,
        private userQueryRepository:IUserQueryRepository
    )
    {}

    async handle(command: LoginCommand):Promise<AuthorizationDto> {
        
        const user = await this.userQueryRepository.findUserByUserName(command.username);
        if(!user)
            throw new Error("Usuario no encontrado.");

        const token = await this.tokenGenerator.generateToken(user)
        return new AuthorizationDto(token, 1);
    }
}