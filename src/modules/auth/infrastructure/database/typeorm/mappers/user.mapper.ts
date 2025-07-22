import { User } from '../../../../domain/users/models/aggregates/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.username,
      entity.password,
      entity.createdAt,
      entity.updatedAt
    );
  }

  static toEntity(domain: User): UserEntity {
    const entity = new UserEntity();
    entity.id = domain.id;
    entity.username = domain.username;
    entity.password = domain.password;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }
} 