import { ILoginControllerToken } from "./login-controller.interface";
import { LoginController } from "./login.controller";
import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { ILoginCommandHandler, ILoginCommandHandlerToken } from "@modules/auth/application/uses-cases/handlers/login-command-handler.interface";
import { IDependencyContainer, IDependencyModule } from "@core/container/interfaces";


export class AuthControllerModule implements IDependencyModule
{
    name = 'AuthControllerModule';

    configure(container: IDependencyContainer): void {
        
        container.registerFactory(ILoginControllerToken, ()=>{
            const handler = container.resolve<ILoginCommandHandler>(ILoginCommandHandlerToken);
            return new LoginController(handler);
        });
    }
    
}

/*

export const authControllersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        options.bind(ILoginControllerToken).toDynamicValue((ctx: any) => {
            const handler = ctx.get(ILoginCommandHandlerToken);
            return new LoginController(handler);
        });
    });*/
