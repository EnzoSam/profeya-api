export const IDbContextToken  = 'IDbContext';

export interface IDbContext {
  initialize(): Promise<void>;
  registerEntity(entity: Function): void;
} 