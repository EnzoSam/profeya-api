import { Container, BindingScope } from 'inversify';
import { IDependencyContainer, IDependencyModule,IDepenencyResolver } from '@core/container/interfaces';

export class InversifyContainer implements IDependencyContainer, IDepenencyResolver {
  private container: Container;
  private modules: Map<string, IDependencyModule> = new Map();
  private isBuilt: boolean = false;

  constructor() {
    this.container = new Container();
  }

  register<T>(interfaceName: string, implementation: new (...args: any[]) => T): void {
    this.container.bind<T>(interfaceName).to(implementation);
  }

  registerSingleton<T>(interfaceName: string, implementation: new (...args: any[]) => T): void {
    this.container.bind<T>(interfaceName).to(implementation).inSingletonScope();
  }

  registerFactory<T>(interfaceName: string, factory: () => T): void {
    this.container.bind<T>(interfaceName).toDynamicValue(() => factory());
  }

  registerInstance<T>(interfaceName: string, instance: T): void {
    this.container.bind<T>(interfaceName).toConstantValue(instance);
  }

  registerModule(module: IDependencyModule): void {
    if (this.modules.has(module.name)) {
      throw new Error(`El modulo '${module.name}' ya ha sido registrado`);
    }
    
    this.modules.set(module.name, module);
  }

  registerModules(modules: IDependencyModule[]): void {
    modules.forEach(module => this.registerModule(module));
  }

  async build(): Promise<void> {
    if (this.isBuilt) {
      throw new Error('El contenedor ya se ha construido.');
    }

    for (const module of this.modules.values()) {
      module.configure(this);
    }

    for (const module of this.modules.values()) {
      if (module.onLoad) {
        await module.onLoad();
      }
    }

    this.isBuilt = true;
  }

  async dispose(): Promise<void> {
    for (const module of this.modules.values()) {
      if (module.onUnload) {
        await module.onUnload();
      }
    }

    this.container.unbindAll();
    this.modules.clear();
    this.isBuilt = false;
  }

  resolve<T>(interfaceName: string): T {
    try {
      return this.container.get<T>(interfaceName);
    } catch (error: any) {
      throw new Error(`No se pudo resolver '${interfaceName}': ${error.message}`);
    }
  }

  tryResolve<T>(interfaceName: string): T | null {
    try {
      return this.container.get<T>(interfaceName);
    } catch {
      return null;
    }
  }

  resolveAll<T>(interfaceName: string): T[] {
    try {
      return this.container.getAll<T>(interfaceName);
    } catch {
      return [];
    }
  }

} 