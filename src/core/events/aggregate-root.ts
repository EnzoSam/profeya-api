import { IEvent } from './event.interface';

export abstract class AggregateRoot {
  private _uncommittedEvents: IEvent[] = [];

  protected addDomainEvent(event: IEvent): void {
    this._uncommittedEvents.push(event);
  }

  public getUncommittedEvents(): IEvent[] {
    return [...this._uncommittedEvents];
  }

  public markEventsAsCommitted(): void {
    this._uncommittedEvents = [];
  }
} 