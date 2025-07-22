export interface ISpecification<T> {
  isSatisfiedBy(entity: T): boolean;
  and(other: ISpecification<T>): ISpecification<T>;
  or(other: ISpecification<T>): ISpecification<T>;
  not(): ISpecification<T>;
}

export interface IQuerySpecification<T> extends ISpecification<T> {
  toQuery(): any; // Para convertir a query de base de datos
} 