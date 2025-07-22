# Contenedor de Inyección de Dependencias

Este módulo implementa un contenedor de inyección de dependencias usando InversifyJS, siguiendo las interfaces definidas en `@core/container`.

## Características

- **Inyección de dependencias**: Resolución automática de dependencias
- **Gestión de módulos**: Sistema modular con dependencias y prioridades
- **Scopes**: Soporte para contenedores con scope
- **Lifecycle hooks**: Hooks `onLoad` y `onUnload` para módulos
- **Factory pattern**: Factory para crear y configurar contenedores

## Estructura

```
src/shared/infrastructure/container/
├── InversifyContainer.ts    # Implementación principal del contenedor
├── ContainerFactory.ts      # Factory para crear contenedores
├── index.ts                 # Exportaciones
├── examples/                # Ejemplos de uso
│   └── ContainerExample.ts
└── README.md               # Esta documentación
```

## Uso Básico

### 1. Crear un contenedor

```typescript
import { ContainerFactory } from '@shared/infrastructure/container';

// Crear contenedor
const container = ContainerFactory.createContainer();

// O crear y configurar automáticamente
const container = await ContainerFactory.createAndConfigureContainer();
```

### 2. Registrar servicios

```typescript
// Registrar implementación
container.register<IUserService>('IUserService', UserService);

// Registrar singleton
container.registerSingleton<IUserRepository>('IUserRepository', PrismaUserRepository);

// Registrar factory
container.registerFactory<IConfiguration>('IConfiguration', () => ({
  database: { url: process.env.DATABASE_URL }
}));

// Registrar instancia
container.registerInstance<ILogger>('ILogger', new ConsoleLogger());
```

### 3. Resolver servicios

```typescript
// Resolver servicio
const userService = container.resolve<IUserService>('IUserService');

// Resolver con verificación
const userRepo = container.tryResolve<IUserRepository>('IUserRepository');
if (userRepo) {
  // Usar repositorio
}

// Verificar si está registrado
if (container.isBound('IUserService')) {
  const service = container.resolve<IUserService>('IUserService');
}
```

## Módulos

Los módulos permiten organizar la configuración del contenedor de forma modular.

### Definir un módulo

```typescript
import { IModule, IContainer } from '@core/container';

export class AuthModule implements IModule {
  readonly name = 'auth';
  
  getDependencies(): string[] {
    return ['database', 'events']; // Módulos de los que depende
  }
  
  getPriority(): number {
    return 100; // Prioridad de carga (mayor = más alta)
  }
  
  configure(container: IContainer): void {
    // Registrar servicios del módulo
    container.registerSingleton<IUserRepository>('IUserRepository', PrismaUserRepository);
    container.registerSingleton<IAuthService>('IAuthService', AuthService);
  }
  
  async onLoad(): Promise<void> {
    // Hook ejecutado después de configurar el módulo
    console.log('Auth module loaded');
  }
  
  async onUnload(): Promise<void> {
    // Hook ejecutado al destruir el módulo
    console.log('Auth module unloaded');
  }
}
```

### Registrar módulos

```typescript
// Registrar módulos individuales
container.registerModule(new AuthModule());
container.registerModule(new DatabaseModule());

// O registrar múltiples módulos
container.registerModules([
  new ConfigurationModule(),
  new DatabaseModule(),
  new EventsModule(),
  new AuthModule()
]);
```

### Construir contenedor

```typescript
// Construir contenedor (configura módulos en orden de dependencias)
await container.build();
```

## Scopes

Los scopes permiten crear contenedores aislados para diferentes contextos.

```typescript
// Crear scope
const scopedContainer = container.createScope();

// Usar scope
const userService = scopedContainer.resolve<IUserService>('IUserService');
```

## Factory Pattern

El `ContainerFactory` proporciona métodos convenientes para gestionar el contenedor.

```typescript
import { ContainerFactory } from '@shared/infrastructure/container';

// Crear contenedor singleton
const container = ContainerFactory.createContainer();

// Obtener contenedor existente
const container = ContainerFactory.getContainer();

// Crear y configurar automáticamente
const container = await ContainerFactory.createAndConfigureContainer();

// Disposal
await ContainerFactory.disposeContainer();
```

## Ejemplo Completo

```typescript
import { ContainerFactory } from '@shared/infrastructure/container';
import { AuthModule, DatabaseModule } from './modules';

async function startApplication() {
  try {
    // Crear contenedor
    const container = ContainerFactory.createContainer();
    
    // Registrar módulos
    container.registerModule(new DatabaseModule());
    container.registerModule(new AuthModule());
    
    // Construir contenedor
    await container.build();
    
    // Usar servicios
    const authService = container.resolve<IAuthService>('IAuthService');
    const user = await authService.login('user@example.com', 'password');
    
    console.log('Application started successfully');
    
  } catch (error) {
    console.error('Failed to start application:', error);
  }
}

startApplication();
```

## Ventajas

1. **Desacoplamiento**: Las dependencias se resuelven automáticamente
2. **Testabilidad**: Fácil mock de dependencias para testing
3. **Modularidad**: Organización clara por módulos
4. **Flexibilidad**: Múltiples formas de registro y resolución
5. **Lifecycle management**: Control del ciclo de vida de módulos
6. **Scopes**: Aislamiento de contextos

## Consideraciones

- Los módulos se cargan en orden de dependencias y prioridad
- Las dependencias circulares se detectan automáticamente
- Los scopes heredan las configuraciones del contenedor padre
- El factory mantiene una instancia singleton del contenedor 