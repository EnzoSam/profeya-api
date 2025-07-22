import { InMemoryEventBus } from '../in-memory-event-bus';
import { UserCreatedEvent } from './user-created-event';
import { UserCreatedEventHandler } from './user-created-event-handler';

// Ejemplo de uso del sistema de eventos
export class EventSystemExample {
  private eventBus: InMemoryEventBus;

  constructor() {
    this.eventBus = new InMemoryEventBus();
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    // Suscribir handlers a eventos
    this.eventBus.subscribe('UserCreatedEvent', new UserCreatedEventHandler());
  }

  async createUser(userId: string, userData: { email: string; name: string; role: string }): Promise<void> {
    try {
      // 1. Crear el evento (sin dispararlo aún)
      const userCreatedEvent = new UserCreatedEvent(userId, userData);

      // 2. Aquí iría la lógica de persistencia en una transacción
      // await this.userRepository.save(user, transaction);

      // 3. Publicar el evento (que disparará todos los handlers suscritos)
      await this.eventBus.publish(userCreatedEvent);

      console.log('User created and events published successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async createMultipleUsers(users: Array<{ id: string; data: { email: string; name: string; role: string } }>): Promise<void> {
    const events = users.map(user => 
      new UserCreatedEvent(user.id, user.data)
    );

    // Publicar múltiples eventos
    await this.eventBus.publishAll(events);
  }
}

// Ejemplo de uso
export async function runExample(): Promise<void> {
  const example = new EventSystemExample();
  
  await example.createUser('user-123', {
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user'
  });

  await example.createMultipleUsers([
    { id: 'user-456', data: { email: 'jane@example.com', name: 'Jane Smith', role: 'admin' } },
    { id: 'user-789', data: { email: 'bob@example.com', name: 'Bob Johnson', role: 'user' } }
  ]);
} 