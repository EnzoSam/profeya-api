
import { ILoginCommandHandler } from "@modules/auth/application/uses-cases/handlers/login-command-handler.interface";
import { Request, Response } from "express";
import { ILoginController } from "./login-controller.interface";
import { LoginCommand } from "@modules/auth/application/uses-cases/commands/login.command";


export class LoginController implements ILoginController {

    constructor(private readonly loginCommandHandler: ILoginCommandHandler,
    ) {}

    async login(req: Request, res: Response): Promise<void> {
                
        const loginCommand = req.body as LoginCommand;
        const authDto = await this.loginCommandHandler.handle(loginCommand);
        res.status(200).json(authDto);
    }

}