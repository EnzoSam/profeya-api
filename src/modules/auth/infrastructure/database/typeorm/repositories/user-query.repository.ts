import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { BaseQueryRepository } from '../../../../../../shared/infrastructure/database/typeorm/base-query.repository';
import { IDbContext } from '@core/domain/repositories/db-context.interface';

export class TypeOrmUserQueryRepository extends BaseQueryRepository<UserEntity> {
  constructor(dbContext: IDbContext) {
    super(dbContext,UserEntity);
  }

  async findUserByUserName(userName: string): Promise<UserEntity | null> {
    return await this.ormRepo.findOneBy({ username: userName });
  }
} 