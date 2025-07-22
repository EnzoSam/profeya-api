import { AuditableEventBus } from '../auditable-event-bus';
import { InMemoryEventStore } from '../in-memory-event-store';
import { UserCreatedEvent } from './user-created-event';
import { UserCreatedEventHandler } from './user-created-event-handler';

// Ejemplo de uso del sistema de eventos con auditoría
export class AuditableEventSystemExample {
  private eventBus: AuditableEventBus;
  private eventStore: InMemoryEventStore;

  constructor() {
    this.eventStore = new InMemoryEventStore();
    this.eventBus = new AuditableEventBus(this.eventStore);
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    // Suscribir handlers a eventos
    this.eventBus.subscribe('UserCreatedEvent', new UserCreatedEventHandler());
  }

  async createUser(userId: string, userData: { email: string; name: string; role: string }): Promise<void> {
    try {
      // 1. Crear el evento
      const userCreatedEvent = new UserCreatedEvent(userId, userData);

      // 2. Aquí iría la lógica de persistencia en una transacción
      // await this.userRepository.save(user, transaction);

      // 3. Publicar el evento (se guarda automáticamente para auditoría)
      await this.eventBus.publish(userCreatedEvent);

      console.log('User created, events published and audited successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Métodos para auditoría
  async getAuditTrailForUser(userId: string): Promise<void> {
    const events = await this.eventBus.getEventsForAggregate(userId);
    
    console.log(`\n=== Audit Trail for User: ${userId} ===`);
    events.forEach(event => {
      console.log(`[${event.occurredOn.toISOString()}] ${event.eventType} - ID: ${event.eventId}`);
    });
  }

  async getRecentUserCreations(): Promise<void> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const events = await this.eventBus.getEventsSince(yesterday);
    const userCreations = events.filter(event => event.eventType === 'UserCreatedEvent');
    
    console.log(`\n=== Recent User Creations (since ${yesterday.toISOString()}) ===`);
    userCreations.forEach(event => {
      console.log(`[${event.occurredOn.toISOString()}] User created: ${event.aggregateId}`);
    });
  }

  async getAllEventsByType(eventType: string): Promise<void> {
    const events = await this.eventBus.getEventsByType(eventType);
    
    console.log(`\n=== All ${eventType} Events ===`);
    events.forEach(event => {
      console.log(`[${event.occurredOn.toISOString()}] ${event.aggregateId} - ID: ${event.eventId}`);
    });
  }
}

// Ejemplo de uso
export async function runAuditableExample(): Promise<void> {
  const example = new AuditableEventSystemExample();
  
  // Crear algunos usuarios
  await example.createUser('user-123', {
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user'
  });

  await example.createUser('user-456', {
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'admin'
  });

  // Consultar auditoría
  await example.getAuditTrailForUser('user-123');
  await example.getRecentUserCreations();
  await example.getAllEventsByType('UserCreatedEvent');
} 