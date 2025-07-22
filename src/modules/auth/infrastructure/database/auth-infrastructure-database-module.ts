import { IUserQueryRepositoryToken } from '@modules/auth/domain/repositories/users/user-query-repository.interface'
import { IUserCommandRepositoryToken } from '@modules/auth/domain/repositories/users/user-command-repository.interface';
import { IDbContext, IDbContextToken } from '@core/domain/repositories/db-context.interface';
import { TypeOrmUserQueryRepository } from './typeorm/repositories/user-query.repository';
import { TypeOrmUserCommandRepository } from './typeorm/repositories/user-command.repository';
import { UserEntity } from './typeorm/entities/user.entity';
import { IDependencyContainer, IDependencyModule } from '@core/container/interfaces';


export class AuthInfrastructureDatabaseModule implements IDependencyModule
{
  name = 'AuthInfrastructureDatabaseModule';

  configure(container: IDependencyContainer): void {
    
    const dbContext = container.resolve<IDbContext>(IDbContextToken);     
    dbContext.registerEntity(UserEntity);

    container.registerFactory(IUserQueryRepositoryToken, ()=>{
         
      
      let a = new TypeOrmUserQueryRepository(dbContext);
      return a;
    });

    container.registerFactory(IUserCommandRepositoryToken, ()=>{
      const dbContext = container.resolve<IDbContext>(IDbContextToken);        
      dbContext.registerEntity(UserEntity);
      let a = new TypeOrmUserCommandRepository(dbContext);
      return a;
    });    
  }
}

/*
export const authInfraestructureDataBaseModule: ContainerModule = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {   
      options.bind(IUserQueryRepositoryToken).toDynamicValue((ctx: any) => {
        const dbContext = ctx.get(IDbContextToken);        
        dbContext.registerEntity(UserEntity);
        console.log('onActivation - bind')
        let a = new TypeOrmUserQueryRepository(dbContext);
        return a;
      }).inRequestScope();
      options.bind(IUserCommandRepositoryToken).toDynamicValue(async (ctx: any) => {
        const dbContext = ctx.get(IDbContextToken);
        return new TypeOrmUserCommandRepository(dbContext);
      }).inRequestScope();
  },);

*/