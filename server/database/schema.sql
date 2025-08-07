-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('admin', 'operator', 'viewer')),
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'inactive')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);

-- Fuel trips table
CREATE TABLE IF NOT EXISTS fuel_trips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  destination TEXT NOT NULL,
  driver TEXT NOT NULL,
  plate TEXT NOT NULL,
  fuel_cost DECIMAL(10,2) NOT NULL,
  observations TEXT,
  image_path TEXT,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Product entries table
CREATE TABLE IF NOT EXISTS product_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  product_type TEXT NOT NULL,
  supplier TEXT NOT NULL,
  tonnage DECIMAL(10,2) NOT NULL,
  observations TEXT,
  image_path TEXT,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Insert default admin user
INSERT OR IGNORE INTO users (id, name, email, password, role, status) VALUES 
(1, 'Jefferson Nunnes', 'jefferson@transportadora.com', 'jefferson123', 'admin', 'active'),
(2, 'Admin User', 'admin@transportadora.com', 'admin123', 'admin', 'active'),
(3, 'João Silva', 'joao@transportadora.com', 'joao123', 'operator', 'active'),
(4, 'Maria Santos', 'maria@transportadora.com', 'maria123', 'viewer', 'active');
