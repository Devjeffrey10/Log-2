import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import { getUsers, getUserById, createUser, updateUser, deleteUser, getUserStats } from "./routes/users.js";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Debug middleware
  app.use((req, res, next) => {
    console.log(`Express received: ${req.method} ${req.url}`);
    next();
  });

  // Example API routes
  app.get("/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: ping });
  });

  app.get("/demo", handleDemo);

  // Simple authentication route for testing
  app.post("/auth/login", (req, res) => {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    // Mock authentication
    const mockUsers = [
      { id: 1, name: "Jefferson Nunnes", email: "jefferson@transportadora.com", password: "jefferson123", role: "admin" },
      { id: 2, name: "Admin User", email: "admin@transportadora.com", password: "admin123", role: "admin" },
      { id: 3, name: "Vinicius", email: "camilacavalcanti@gmail.com", password: "joao123", role: "operator" },
      
    ];

    const user = mockUsers.find(u => u.email === email && u.password === password);

    res.setHeader('Content-Type', 'application/json');
    if (user) {
      res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Email ou senha incorretos"
      });
    }
  });

  app.post("/auth/logout", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, message: "Logout realizado com sucesso" });
  });

  // User management routes with fallback mock data
  app.get("/users", (req, res) => {
    console.log('Users endpoint called');
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: [
        { id: 1, name: "Jefferson Nunnes", email: "jefferson@transportadora.com", role: "admin", status: "active", created_at: "2024-01-01", updated_at: "2024-01-01", last_login: null },
        { id: 2, name: "Admin User", email: "admin@transportadora.com", role: "admin", status: "active", created_at: "2024-01-01", updated_at: "2024-01-01", last_login: null },
        { id: 3, name: "João Silva", email: "joao@transportadora.com", role: "operator", status: "active", created_at: "2024-01-01", updated_at: "2024-01-01", last_login: null },
        { id: 4, name: "Maria Santos", email: "maria@transportadora.com", role: "viewer", status: "active", created_at: "2024-01-01", updated_at: "2024-01-01", last_login: null }
      ]
    });
  });

  app.get("/users/stats", (req, res) => {
    console.log('User stats endpoint called');
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: { admin: 2, operator: 1, viewer: 1, total: 4 }
    });
  });

  app.get("/users/:id", (req, res) => {
    console.log('Get user by ID endpoint called:', req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: { id: 1, name: "Jefferson Nunnes", email: "jefferson@transportadora.com", role: "admin", status: "active", created_at: "2024-01-01", updated_at: "2024-01-01", last_login: null }
    });
  });

  app.post("/users", (req, res) => {
    console.log('Create user endpoint called:', req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({
      success: true,
      data: { id: 5, ...req.body, status: "active", created_at: "2024-01-01", updated_at: "2024-01-01", last_login: null },
      message: "Usuário criado com sucesso"
    });
  });

  app.put("/users/:id", (req, res) => {
    console.log('Update user endpoint called:', req.params.id, req.body);
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: { id: parseInt(req.params.id), ...req.body, status: "active", created_at: "2024-01-01", updated_at: "2024-01-01", last_login: null },
      message: "Usuário atualizado com sucesso"
    });
  });

  app.delete("/users/:id", (req, res) => {
    console.log('Delete user endpoint called:', req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      message: "Usuário excluído com sucesso"
    });
  });

  console.log("🚀 TransporteManager API initialized");

  return app;
}
