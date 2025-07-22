import { IQueryRepository } from '@core/domain/repositories/query-repository.interface';
import { User } from '../../users/models/aggregates/user';

export interface IUserQueryRepository extends IQueryRepository<User> {

  findUserByUserName(userName:string):Promise<User | null>
}