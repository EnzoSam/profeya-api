import { Request, Response } from "express";

export const ILoginControllerToken = 'ILoginController';

export interface ILoginController {
    login(req: Request, res: Response): Promise<void>;
}