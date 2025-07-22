export class AuthorizationDto {
    constructor(
        public readonly token: string,
        public readonly expiresIn: number
    ) {}
}