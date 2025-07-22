import { IEvent } from './event.interface';
import { IEventHandler } from './eventHandler.interface';
import { IEventBus } from './event-bus.interface';
import { IEventStore } from './event-store.interface';

export class AuditableEventBus implements IEventBus {
  private handlers: Map<string, IEventHandler<IEvent>[]> = new Map();
  private eventStore: IEventStore;

  constructor(eventStore: IEventStore) {
    this.eventStore = eventStore;
  }

  async publish<T extends IEvent>(event: T): Promise<void> {
    console.log(`Publishing event: ${event.eventType} with ID: ${event.eventId}`);

    // 1. Persistir evento para auditoría
    await this.eventStore.append(event.aggregateId, [event]);

    // 2. Ejecutar handlers
    await this.publishToHandlers(event);
  }

  async publishAll(events: IEvent[]): Promise<void> {
    if (events.length === 0) return;

    // Agrupar eventos por aggregateId para persistencia eficiente
    const eventsByAggregate = new Map<string, IEvent[]>();
    
    events.forEach(event => {
      if (!eventsByAggregate.has(event.aggregateId)) {
        eventsByAggregate.set(event.aggregateId, []);
      }
      eventsByAggregate.get(event.aggregateId)!.push(event);
    });

    // 1. Persistir todos los eventos
    for (const [aggregateId, aggregateEvents] of eventsByAggregate) {
      await this.eventStore.append(aggregateId, aggregateEvents);
    }

    // 2. Publicar eventos a handlers
    for (const event of events) {
      await this.publishToHandlers(event);
    }
  }

  private async publishToHandlers<T extends IEvent>(event: T): Promise<void> {
    const eventType = event.eventType;
    const handlers = this.handlers.get(eventType) || [];

    const promises = handlers.map(handler => 
      handler.handle(event).catch(error => {
        console.error(`Error handling event ${eventType}:`, error);
        throw error;
      })
    );

    await Promise.all(promises);
  }

  subscribe<T extends IEvent>(eventType: string, handler: IEventHandler<T>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    
    this.handlers.get(eventType)!.push(handler as IEventHandler<IEvent>);
    console.log(`Subscribed handler to event: ${eventType}`);
  }

  unsubscribe(eventType: string, handler: IEventHandler<IEvent>): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
        console.log(`Unsubscribed handler from event: ${eventType}`);
      }
    }
  }

  // Métodos para auditoría
  async getEventsForAggregate(aggregateId: string): Promise<IEvent[]> {
    return this.eventStore.getEvents(aggregateId);
  }

  async getEventsByType(eventType: string): Promise<IEvent[]> {
    return this.eventStore.getEventsByType(eventType);
  }

  async getEventsSince(date: Date): Promise<IEvent[]> {
    return this.eventStore.getEventsSince(date);
  }
} 