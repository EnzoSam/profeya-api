import { IAuthTokenGenerator } from "@modules/auth/domain/users/services/auth-token-generator.interface";
import { User } from "@modules/auth/domain/users/models/aggregates/user";
import jwt from "jsonwebtoken";

export class JwtAuthTokenGenerator implements IAuthTokenGenerator {
  constructor(private readonly secret: string, private readonly expiresIn: string = "1h") {}

  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      name: user.username,
    };
    return jwt.sign(payload, this.secret);
  }
} 