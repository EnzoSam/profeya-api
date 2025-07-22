export const IUserQueryRepositoryToken = 'IUserQueryRepository';

export interface IUserQueryRepository {
  findById(id: string): Promise<any>;
  findUserByUserName(userName: string): Promise<any>;
  findAll(): Promise<any[]>;
  findBy(filters: any): Promise<any[]>;
} 