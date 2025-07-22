import { IDependencyContainer } from './dependency-container.interface';

export interface IDependencyModule {
  readonly name: string;
  
  configure(container: IDependencyContainer): void;
  
  onLoad?(): Promise<void>;
  onUnload?(): Promise<void>;  
} 