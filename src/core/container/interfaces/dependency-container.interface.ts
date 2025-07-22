import { IDependencyModule } from './dependecy-module.interface';

export interface IDependencyContainer {
  register<T>(interfaceName: string, implementation: new (...args: any[]) => T): void;
  registerSingleton<T>(interfaceName: string, implementation: new (...args: any[]) => T): void;
  registerFactory<T>(interfaceName: string, factory: () => T): void;
  registerInstance<T>(interfaceName: string, instance: T): void;
  
  resolve<T>(interfaceName: string): T;
  tryResolve<T>(interfaceName: string): T | null;
  resolveAll<T>(interfaceName: string): T[];
  
  registerModule(module: IDependencyModule): void;
  registerModules(modules: IDependencyModule[]): void;
  
  build(): Promise<void>;
  dispose(): Promise<void>;
  
} 