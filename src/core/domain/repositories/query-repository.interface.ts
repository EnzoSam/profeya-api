export interface IQueryRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  findBy(filters: Partial<T>): Promise<T[]>;
} 