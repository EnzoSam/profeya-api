import { LoginCommand } from "../commands/login.command";
import { AuthorizationDto } from "@modules/auth/domain/users/dtos/authorization.dto";

export const ILoginCommandHandlerToken = 'ILoginCommandHandler';

export interface ILoginCommandHandler {
    handle(command: LoginCommand): Promise<AuthorizationDto>;
}