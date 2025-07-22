
import { ContainerFactory } from '@shared/infrastructure/container';
import { AuthControllerModule } from '@modules/auth/api/controllers/auth-controller-module';
import { AuthInfrastructureDatabaseModule } from '@modules/auth/infrastructure/database/auth-infrastructure-database-module';
import { SharedInfrastructureDatabaseModule } from '@shared/infrastructure/database/typeorm/shared-infrastructure-database-module';
import { AuthInfraestructureSecurityModule } from '@modules/auth/infrastructure/security/auth-infrastructure-security-module';
import { AuthApplicationModule } from '@modules/auth/application/uses-cases/auth-application-module';

const  dependencyContainer = ContainerFactory.createContainer();

dependencyContainer.registerModule(new SharedInfrastructureDatabaseModule());
dependencyContainer.registerModule(new AuthInfraestructureSecurityModule());
dependencyContainer.registerModule(new AuthInfrastructureDatabaseModule());
dependencyContainer.registerModule(new AuthControllerModule());
dependencyContainer.registerModule(new AuthApplicationModule());
dependencyContainer.build();


export {dependencyContainer};


//const container = new Container();
/*
// DB Context
container.bind(IDbContextToken).toDynamicValue(() => {
    const dbContext = new TypeORMDbContext();
    dbContext.registerEntity(UserEntity);
    return dbContext;
}).inSingletonScope();*/
/*
container.load(sharedInfraestructureDatabaseTypeORM);
container.load(authInfraestructureSecurityModule);
container.load(authInfraestructureDataBaseModule);
container.load(authApplicationModule);
container.load(authControllersModule);
container.load(re());

export {container};


*/



