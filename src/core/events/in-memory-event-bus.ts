import { IEvent } from './event.interface';
import { IEventHandler } from './eventHandler.interface';
import { IEventBus } from './event-bus.interface';

export class InMemoryEventBus implements IEventBus {
  private handlers: Map<string, IEventHandler<IEvent>[]> = new Map();

  async publish<T extends IEvent>(event: T): Promise<void> {
    console.log(`Publishing event: ${event.eventType} with ID: ${event.eventId}`);

    // Ejecutar handlers
    await this.publishToHandlers(event);
  }

  async publishAll(events: IEvent[]): Promise<void> {
    for (const event of events) {
      await this.publishToHandlers(event);
    }
  }

  private async publishToHandlers<T extends IEvent>(event: T): Promise<void> {
    const eventType = event.eventType;
    const handlers = this.handlers.get(eventType) || [];

    // Ejecutar todos los handlers de forma asíncrona
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

  // Método para limpiar todos los handlers (útil para testing)
  clear(): void {
    this.handlers.clear();
  }
} 