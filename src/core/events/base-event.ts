import { IEvent } from './event.interface';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEvent implements IEvent {
  public readonly eventId: string;
  public readonly eventType: string;
  public readonly occurredOn: Date;
  public readonly aggregateId: string;

  constructor(aggregateId: string) {
    this.eventId = uuidv4();
    this.eventType = this.constructor.name;
    this.occurredOn = new Date();
    this.aggregateId = aggregateId;
  }
} 