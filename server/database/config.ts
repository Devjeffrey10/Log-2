import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create or connect to SQLite database
const db = new Database(join(__dirname, 'transport.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database with schema
const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

console.log('✅ Database initialized successfully');

export default db;
