import { IAuthTokenGeneratorToken } from "@modules/auth/domain/users/services/auth-token-generator.interface";
import { JwtAuthTokenGenerator } from "./jwt-auth-token-generator";
import { IDependencyContainer, IDependencyModule } from "@core/container/interfaces";


export class AuthInfraestructureSecurityModule implements IDependencyModule
{
    name = 'AuthInfraestructureSecurityModule';
    configure(container: IDependencyContainer): void {

        container.registerFactory(IAuthTokenGeneratorToken, ()=>
        {
            return new JwtAuthTokenGenerator('123', '1h');
        } )
    }

    
}

/*
export const authInfraestructureSecurityModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        options.bind(IAuthTokenGeneratorToken).toDynamicValue(() => {
            return new JwtAuthTokenGenerator('123', '1h');
        }).inRequestScope();
    });
*/