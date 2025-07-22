// Interfaces
export { IEvent } from './event.interface';
export { IEventHandler } from './eventHandler.interface';
export { IEventBus } from './event-bus.interface';
export { IEventStore } from './event-store.interface';

// Clases base
export { BaseEvent } from './base-event';
export { AggregateRoot } from './aggregate-root';

// Implementaciones
export { InMemoryEventBus } from './in-memory-event-bus';
export { AuditableEventBus } from './auditable-event-bus';
export { InMemoryEventStore } from './in-memory-event-store'; 