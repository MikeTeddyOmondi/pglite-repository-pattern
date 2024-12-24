# PGLite - Demo of Repository Pattern

Sample Boilerplate (AI Generated)

```ts
// user.entity.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// user.repository.ts
export class UserRepository {
  private users: User[] = []; // Mock database

  // Find a user by ID
  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return this.users;
  }

  // Create a new user
  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  // Update a user by ID
  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    return this.users[userIndex];
  }

  // Delete a user by ID
  async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }
}

// user.service.ts
import { User, UserRepository } from './user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}

// index.ts (or app.ts)
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

(async () => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);

  // Create users
  const user1 = await userService.createUser({ id: '1', name: 'Alice', email: 'alice@example.com' });
  const user2 = await userService.createUser({ id: '2', name: 'Bob', email: 'bob@example.com' });

  console.log('Users after creation:', await userService.getAllUsers());

  // Update a user
  await userService.updateUser('1', { name: 'Alice Updated' });
  console.log('User 1 after update:', await userService.getUserById('1'));

  // Delete a user
  await userService.deleteUser('2');
  console.log('Users after deletion:', await userService.getAllUsers());
})();

```