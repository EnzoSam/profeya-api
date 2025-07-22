import { BaseEvent } from '../base-event';

export interface UserCreatedEventData {
  email: string;
  name: string;
  role: string;
}

export class UserCreatedEvent extends BaseEvent {
  public readonly data: UserCreatedEventData;

  constructor(aggregateId: string, data: UserCreatedEventData) {
    super(aggregateId);
    this.data = data;
  }
} 