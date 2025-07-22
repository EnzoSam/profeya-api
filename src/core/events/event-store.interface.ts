import { IEvent } from './event.interface';

export interface IEventStore {
  append(aggregateId: string, events: IEvent[]): Promise<void>;
  getEvents(aggregateId: string): Promise<IEvent[]>;
  getEventsByType(eventType: string): Promise<IEvent[]>;
  getEventsSince(date: Date): Promise<IEvent[]>;
} 