import { AggregateRoot } from '@core/events/aggregate-root';

export class User extends AggregateRoot {
  private _id: string;
  private _username: string;
  private _password: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    username: string,
    password: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    super();
    this._id = id;
    this._username = username;
    this._password = password;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  // Getters
  get id(): string { return this._id; }
  get username(): string { return this._username; }
  get password(): string { return this._password; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  
  changeName(newName: string): void {
    if (!newName || newName.trim() === '') {
      throw new Error('Name cannot be empty');
    }

    this._username = newName.trim();
    this._updatedAt = new Date();
  }

  changePassword(newPassword: string): void {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    this._password = newPassword;
    this._updatedAt = new Date();
  }
} 