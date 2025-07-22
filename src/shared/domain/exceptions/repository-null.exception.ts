export class RepositoryNullException extends Error {
  constructor(message: string = 'El repositorio es null.') {
    super(message);
    this.name = 'RepositoryNullException';
  }
} 