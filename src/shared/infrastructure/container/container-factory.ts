import { InversifyContainer } from './inversify-container';
import { IDependencyContainer } from '@core/container/interfaces';

export class ContainerFactory {
  private static instance: IDependencyContainer;

  static createContainer(): IDependencyContainer {
    if (!ContainerFactory.instance) {
      ContainerFactory.instance = new InversifyContainer();
    }
    return ContainerFactory.instance;
  }

  static async createAndConfigureContainer(): Promise<IDependencyContainer> {
    const container = ContainerFactory.createContainer();
    await container.build();
    return container;
  }

  static getContainer(): IDependencyContainer {
    if (!ContainerFactory.instance) {
      throw new Error('El contenedor no se ha instanciado aún.');
    }
    return ContainerFactory.instance;
  }

  static async disposeContainer(): Promise<void> {
    if (ContainerFactory.instance) {
      await ContainerFactory.instance.dispose();
      ContainerFactory.instance = null as any;
    }
  }
} 