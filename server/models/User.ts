import db from '../database/config.js';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'operator' | 'viewer';
  status?: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
  last_login?: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

export class UserModel {
  // Get all users (without passwords)
  static getAllUsers(): UserResponse[] {
    const stmt = db.prepare(`
      SELECT id, name, email, role, status, created_at, updated_at, last_login 
      FROM users 
      ORDER BY created_at DESC
    `);
    return stmt.all() as UserResponse[];
  }

  // Get user by email for authentication
  static getUserByEmail(email: string): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND status = "active"');
    return stmt.get(email) as User | null;
  }

  // Get user by ID
  static getUserById(id: number): UserResponse | null {
    const stmt = db.prepare(`
      SELECT id, name, email, role, status, created_at, updated_at, last_login 
      FROM users 
      WHERE id = ?
    `);
    return stmt.get(id) as UserResponse | null;
  }

  // Create new user
  static createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): UserResponse {
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password, role, status)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      userData.name,
      userData.email,
      userData.password,
      userData.role,
      userData.status || 'active'
    );

    const newUser = this.getUserById(result.lastInsertRowid as number);
    if (!newUser) {
      throw new Error('Failed to create user');
    }
    
    return newUser;
  }

  // Update user
  static updateUser(id: number, userData: Partial<Omit<User, 'id' | 'created_at'>>): UserResponse | null {
    const fields = [];
    const values = [];

    if (userData.name) {
      fields.push('name = ?');
      values.push(userData.name);
    }
    if (userData.email) {
      fields.push('email = ?');
      values.push(userData.email);
    }
    if (userData.password) {
      fields.push('password = ?');
      values.push(userData.password);
    }
    if (userData.role) {
      fields.push('role = ?');
      values.push(userData.role);
    }
    if (userData.status) {
      fields.push('status = ?');
      values.push(userData.status);
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = db.prepare(`
      UPDATE users 
      SET ${fields.join(', ')}
      WHERE id = ?
    `);
    
    stmt.run(...values);
    return this.getUserById(id);
  }

  // Update last login
  static updateLastLogin(id: number): void {
    const stmt = db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(id);
  }

  // Delete user (soft delete by setting status to inactive)
  static deleteUser(id: number): boolean {
    const stmt = db.prepare('UPDATE users SET status = "inactive" WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // Check if email exists
  static emailExists(email: string, excludeId?: number): boolean {
    let stmt;
    if (excludeId) {
      stmt = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?');
      return !!stmt.get(email, excludeId);
    } else {
      stmt = db.prepare('SELECT id FROM users WHERE email = ?');
      return !!stmt.get(email);
    }
  }

  // Get user count by role
  static getUserCountByRole(): { admin: number; operator: number; viewer: number } {
    const stmt = db.prepare(`
      SELECT role, COUNT(*) as count 
      FROM users 
      WHERE status = 'active' 
      GROUP BY role
    `);
    
    const results = stmt.all() as { role: string; count: number }[];
    const counts = { admin: 0, operator: 0, viewer: 0 };
    
    results.forEach(result => {
      if (result.role in counts) {
        counts[result.role as keyof typeof counts] = result.count;
      }
    });
    
    return counts;
  }
}
