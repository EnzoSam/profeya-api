export const IUserCommandRepositoryToken = 'IUserCommandRepository';

export interface IUserCommandRepository {
  save(user: any): Promise<void>;
  delete(id: string): Promise<void>;
}
