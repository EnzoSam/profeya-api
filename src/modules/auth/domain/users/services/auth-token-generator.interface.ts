import { User } from "../models/aggregates/user";

export const IAuthTokenGeneratorToken = "IAuthTokenGenerator";

export interface IAuthTokenGenerator {
    generateToken(user: User): string;
}