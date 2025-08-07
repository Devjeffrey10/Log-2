import { RequestHandler } from "express";
import { UserModel, User } from "../models/User.js";

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'operator' | 'viewer';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'operator' | 'viewer';
  status?: 'active' | 'inactive';
}

// Get all users
export const getUsers: RequestHandler = (req, res) => {
  try {
    const users = UserModel.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Erro ao buscar usuários" 
    });
  }
};

// Get user by ID
export const getUserById: RequestHandler = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "ID inválido" 
      });
    }

    const user = UserModel.getUserById(id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "Usuário não encontrado" 
      });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Erro ao buscar usuário" 
    });
  }
};

// Create new user
export const createUser: RequestHandler = (req, res) => {
  try {
    const { name, email, password, role }: CreateUserRequest = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios"
      });
    }

    if (!['admin', 'operator', 'viewer'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Função inválida"
      });
    }

    // Check if email already exists
    if (UserModel.emailExists(email)) {
      return res.status(409).json({
        success: false,
        message: "Este email já está em uso"
      });
    }

    // Create user
    const newUser = UserModel.createUser({
      name,
      email,
      password,
      role
    });

    res.status(201).json({ 
      success: true, 
      data: newUser,
      message: "Usuário criado com sucesso"
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Erro ao criar usuário" 
    });
  }
};

// Update user
export const updateUser: RequestHandler = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateData: UpdateUserRequest = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "ID inválido" 
      });
    }

    // Check if user exists
    const existingUser = UserModel.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ 
        success: false, 
        message: "Usuário não encontrado" 
      });
    }

    // Validate role if provided
    if (updateData.role && !['admin', 'operator', 'viewer'].includes(updateData.role)) {
      return res.status(400).json({
        success: false,
        message: "Função inválida"
      });
    }

    // Check email uniqueness if email is being updated
    if (updateData.email && UserModel.emailExists(updateData.email, id)) {
      return res.status(409).json({
        success: false,
        message: "Este email já está em uso"
      });
    }

    // Update user
    const updatedUser = UserModel.updateUser(id, updateData);

    res.json({ 
      success: true, 
      data: updatedUser,
      message: "Usuário atualizado com sucesso"
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Erro ao atualizar usuário" 
    });
  }
};

// Delete user (soft delete)
export const deleteUser: RequestHandler = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "ID inválido" 
      });
    }

    // Check if user exists
    const existingUser = UserModel.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ 
        success: false, 
        message: "Usuário não encontrado" 
      });
    }

    // Don't allow deleting the last admin
    const userCounts = UserModel.getUserCountByRole();
    if (existingUser.role === 'admin' && userCounts.admin <= 1) {
      return res.status(400).json({
        success: false,
        message: "Não é possível excluir o último administrador"
      });
    }

    const deleted = UserModel.deleteUser(id);

    if (deleted) {
      res.json({ 
        success: true, 
        message: "Usuário excluído com sucesso"
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: "Erro ao excluir usuário" 
      });
    }
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Erro ao excluir usuário" 
    });
  }
};

// Get user statistics
export const getUserStats: RequestHandler = (req, res) => {
  try {
    const stats = UserModel.getUserCountByRole();
    const totalUsers = stats.admin + stats.operator + stats.viewer;
    
    res.json({ 
      success: true, 
      data: {
        ...stats,
        total: totalUsers
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Erro ao buscar estatísticas" 
    });
  }
};
