import { IEventHandler } from '../eventHandler.interface';
import { UserCreatedEvent } from './user-created-event';

export class UserCreatedEventHandler implements IEventHandler<UserCreatedEvent> {
  async handle(event: UserCreatedEvent): Promise<void> {
    console.log(`Handling UserCreatedEvent for user: ${event.aggregateId}`);
    console.log(`User data:`, event.data);
    
    // Aquí iría la lógica de negocio específica
    // Por ejemplo:
    // - Enviar email de bienvenida
    // - Crear perfil por defecto
    // - Registrar en analytics
    // - Notificar a otros sistemas
    
    await this.sendWelcomeEmail(event.data.email, event.data.name);
    await this.createDefaultProfile(event.aggregateId);
  }

  private async sendWelcomeEmail(email: string, name: string): Promise<void> {
    console.log(`Sending welcome email to: ${email} for user: ${name}`);
    // Implementación del envío de email
  }

  private async createDefaultProfile(userId: string): Promise<void> {
    console.log(`Creating default profile for user: ${userId}`);
    // Implementación de creación de perfil
  }
} 