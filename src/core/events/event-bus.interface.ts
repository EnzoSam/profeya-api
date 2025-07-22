import { IEvent } from './event.interface';
import { IEventHandler } from './eventHandler.interface';

export interface IEventBus {
  publish<T extends IEvent>(event: T): Promise<void>;
  publishAll(events: IEvent[]): Promise<void>;
  subscribe<T extends IEvent>(eventType: string, handler: IEventHandler<T>): void;
  unsubscribe(eventType: string, handler: IEventHandler<IEvent>): void;
} 