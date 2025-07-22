export interface IDepenencyResolver {
  resolve<T>(interfaceName: string): T;
  tryResolve<T>(interfaceName: string): T | null;
  resolveAll<T>(interfaceName: string): T[];
} 