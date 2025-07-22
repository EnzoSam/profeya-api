import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { ILoginCommandHandlerToken } from "./handlers/login-command-handler.interface";
import { LoginCommandHandler } from "./handlers/login-command-handler";
import { IAuthTokenGenerator, IAuthTokenGeneratorToken } from "@modules/auth/domain/users/services/auth-token-generator.interface";
import { IUserQueryRepositoryToken } from "@modules/auth/domain/repositories/users/user-query-repository.interface";
import { IDependencyContainer, IDependencyModule } from "@core/container/interfaces";
import { IUserQueryRepository } from "@modules/auth/domain/repositories/users/user-query-repository";


export class AuthApplicationModule implements IDependencyModule
{
    name = 'AuthApplicationModule';
    configure(container: IDependencyContainer): void {
        container.registerFactory(ILoginCommandHandlerToken, ()=>{
            const tokenGenerator = container.resolve<IAuthTokenGenerator>(IAuthTokenGeneratorToken);
            const userQueryRepository = container.resolve<IUserQueryRepository>(IUserQueryRepositoryToken);
            return new LoginCommandHandler(tokenGenerator, userQueryRepository);
        })    
    }
    
}

/*
export const authApplicationModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        options.bind(ILoginCommandHandlerToken).toDynamicValue((ctx: any) => {
            const tokenGenerator = ctx.get(IAuthTokenGeneratorToken);
            const userQueryRepository = ctx.get(IUserQueryRepositoryToken);
            return new LoginCommandHandler(tokenGenerator, userQueryRepository);
        });
});*/
  