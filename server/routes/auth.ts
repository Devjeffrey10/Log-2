import { RequestHandler } from "express";
import { UserModel } from "../models/User.js";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  message?: string;
}

export const handleLogin: RequestHandler = (req, res) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios"
      } as AuthResponse);
    }

    // Find user by email
    const user = UserModel.getUserByEmail(email);
    
    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos"
      } as AuthResponse);
    }

    // Update last login
    UserModel.updateLastLogin(user.id!);

    // Return user data (without password)
    const response: AuthResponse = {
      success: true,
      user: {
        id: user.id!,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    } as AuthResponse);
  }
};

export const handleLogout: RequestHandler = (req, res) => {
  // In a real app, you would invalidate the session/token here
  res.json({ success: true, message: "Logout realizado com sucesso" });
};
