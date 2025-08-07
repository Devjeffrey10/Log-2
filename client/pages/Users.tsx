import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiService, User, CreateUserData, UpdateUserData } from "@/services/api";
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Shield, 
  CheckCircle, 
  XCircle,
  Eye,
  EyeOff,
  Mail,
  Calendar,
  Loader2
} from "lucide-react";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // User data state
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  const [newUser, setNewUser] = useState<CreateUserData>({
    name: "",
    email: "",
    role: "operator",
    password: ""
  });

  const roleLabels = {
    admin: "Administrador",
    operator: "Operador", 
    viewer: "Visualizador"
  };

  const roleDescriptions = {
    admin: "Acesso total ao sistema - pode gerenciar usuários, configurações e todos os dados",
    operator: "Pode registrar viagens e produtos, visualizar relatórios básicos",
    viewer: "Apenas visualização de dados - não pode editar informações"
  };

  // Load users from API
  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getUsers();
      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao carregar usuários",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro de conexão com o servidor",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || filterRole === "all" || user.role === filterRole;
    const matchesStatus = !filterStatus || filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const response = await apiService.createUser(newUser);
      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Usuário criado com sucesso",
        });
        setNewUser({ name: "", email: "", role: "operator", password: "" });
        setIsAddDialogOpen(false);
        loadUsers(); // Reload users list
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao criar usuário",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro de conexão com o servidor",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser({ ...user });
    setIsEditDialogOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    setIsSaving(true);
    try {
      const updateData: UpdateUserData = {
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        status: selectedUser.status,
      };

      const response = await apiService.updateUser(selectedUser.id, updateData);
      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso",
        });
        setIsEditDialogOpen(false);
        setSelectedUser(null);
        loadUsers(); // Reload users list
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao atualizar usuário",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro de conexão com o servidor",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) {
      return;
    }

    try {
      const response = await apiService.deleteUser(userId);
      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Usuário excluído com sucesso",
        });
        loadUsers(); // Reload users list
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao excluir usuário",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro de conexão com o servidor",
        variant: "destructive",
      });
    }
  };

  const toggleUserStatus = async (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const newStatus = user.status === "active" ? "inactive" : "active";
    
    try {
      const response = await apiService.updateUser(userId, { status: newStatus });
      if (response.success) {
        toast({
          title: "Sucesso",
          description: `Usuário ${newStatus === "active" ? "ativado" : "desativado"} com sucesso`,
        });
        loadUsers(); // Reload users list
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao alterar status do usuário",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro de conexão com o servidor",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-8 w-8" />
            Gerenciamento de Usuários
          </h1>
          <p className="text-muted-foreground">Controle de acesso e permissões do sistema</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Usuário</DialogTitle>
              <DialogDescription>
                Crie uma nova conta de usuário para o sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Digite o nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Digite o email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Nível de Acesso</Label>
                <Select value={newUser.role} onValueChange={(value: any) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="operator">Operador</SelectItem>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {roleDescriptions[newUser.role]}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Digite uma senha"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddUser} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando...
                  </>
                ) : (
                  "Adicionar Usuário"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Lista de Usuários</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
        </TabsList>

        {/* Users List Tab */}
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Usuários do Sistema ({filteredUsers.length})</CardTitle>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filtrar por função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as funções</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="operator">Operador</SelectItem>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Último Acesso</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            ID: {user.id}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'default' : user.role === 'operator' ? 'secondary' : 'outline'}>
                            <Shield className="h-3 w-3 mr-1" />
                            {roleLabels[user.role]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status === 'active' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {user.status === 'active' ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {user.last_login ? new Date(user.last_login).toLocaleDateString('pt-BR') : 'Nunca'}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              {user.status === 'active' ? (
                                <XCircle className="h-3 w-3" />
                              ) : (
                                <CheckCircle className="h-3 w-3" />
                              )}
                            </Button>
                            {user.role !== 'admin' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum usuário encontrado</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Permissões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(roleLabels).map(([role, label]) => (
                  <div key={role} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">{label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {roleDescriptions[role as keyof typeof roleDescriptions]}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Dashboard</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            Visualizar métricas
                          </div>
                          {role === 'admin' && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              Exportar relatórios
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Gestão de Combustível</h4>
                        <div className="space-y-1 text-sm">
                          {(role === 'admin' || role === 'operator') && (
                            <>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                Registrar viagens
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                Editar registros
                              </div>
                            </>
                          )}
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            Visualizar viagens
                          </div>
                          {role === 'viewer' && (
                            <div className="flex items-center gap-2">
                              <XCircle className="h-3 w-3 text-red-600" />
                              Editar registros
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Usuários</h4>
                        <div className="space-y-1 text-sm">
                          {role === 'admin' ? (
                            <>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                Gerenciar usuários
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                Definir permissões
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-2">
                                <XCircle className="h-3 w-3 text-red-600" />
                                Gerenciar usuários
                              </div>
                              <div className="flex items-center gap-2">
                                <XCircle className="h-3 w-3 text-red-600" />
                                Definir permissões
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Atualize as informações do usuário.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome Completo</Label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Nível de Acesso</Label>
                <Select 
                  value={selectedUser.role} 
                  onValueChange={(value: any) => setSelectedUser({ ...selectedUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="operator">Operador</SelectItem>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateUser} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Atualizando...
                </>
              ) : (
                "Atualizar Usuário"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
