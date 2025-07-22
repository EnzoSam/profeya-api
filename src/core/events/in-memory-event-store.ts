import { IEvent } from './event.interface';
import { IEventStore } from './event-store.interface';

export class InMemoryEventStore implements IEventStore {
  private events: IEvent[] = [];

  async append(aggregateId: string, events: IEvent[]): Promise<void> {
    // Agregar eventos a la colección en memoria
    this.events.push(...events);
    
    console.log(`Stored ${events.length} events for aggregate: ${aggregateId}`);
    
    // En una implementación real, aquí guardarías en base de datos
    // await this.db.events.insertMany(events.map(event => ({
    //   eventId: event.eventId,
    //   eventType: event.eventType,
    //   occurredOn: event.occurredOn,
    //   aggregateId: event.aggregateId,
    //   data: event // o event.data si tienes datos específicos
    // })));
  }

  async getEvents(aggregateId: string): Promise<IEvent[]> {
    // Filtrar eventos por aggregateId
    return this.events.filter(event => event.aggregateId === aggregateId);
  }

  async getEventsByType(eventType: string): Promise<IEvent[]> {
    // Filtrar eventos por tipo
    return this.events.filter(event => event.eventType === eventType);
  }

  async getEventsSince(date: Date): Promise<IEvent[]> {
    // Filtrar eventos desde una fecha específica
    return this.events.filter(event => event.occurredOn >= date);
  }

  // Método adicional para auditoría
  async getAllEvents(): Promise<IEvent[]> {
    return [...this.events];
  }

  // Método para limpiar (útil para testing)
  clear(): void {
    this.events = [];
  }
} 