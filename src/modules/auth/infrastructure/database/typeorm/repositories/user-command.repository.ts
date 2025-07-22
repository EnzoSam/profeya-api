import { UserEntity } from '../entities/user.entity';
import { BaseCommandRepository } from '../../../../../../shared/infrastructure/database/typeorm/base-command.repository';
import { IDbContext } from '@core/domain/repositories/db-context.interface';

export class TypeOrmUserCommandRepository extends BaseCommandRepository<UserEntity> {
  constructor(dbContext: IDbContext) {
    super(dbContext, UserEntity);
  }
} 