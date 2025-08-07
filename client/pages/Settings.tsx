import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  Save,
  Download,
  Upload,
  Trash2,
  Shield,
  Bell,
  Database,
  Palette,
  Globe,
  Mail,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  HardDrive,
  Cloud,
  Clock,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [settings, setSettings] = useState({
    companyName: "TransporteManager",
    companyEmail: "admin@transportadora.com",
    companyPhone: "(11) 99999-9999",
    address: "",
    timezone: "America/Sao_Paulo",
    language: "pt-BR",
    currency: "BRL",
    dateFormat: "DD/MM/YYYY",
    backupFrequency: "daily",
    retentionDays: "30",
    maxFileSize: "10",
    allowedFileTypes: "jpg,jpeg,png,pdf",
  });

  const handleSaveSettings = () => {
    // Implementation to save settings
    console.log("Settings saved:", settings);
  };

  const handleExportData = () => {
    // Implementation to export data
    console.log("Exporting data...");
  };

  const handleImportData = () => {
    // Implementation to import data
    console.log("Importing data...");
  };

  const handleBackupNow = () => {
    // Implementation to create backup
    console.log("Creating backup...");
  };

  const handleRestoreBackup = () => {
    // Implementation to restore backup
    console.log("Restoring backup...");
  };

  const handleResetSystem = () => {
    // Implementation to reset system
    console.log("Resetting system...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <SettingsIcon className="h-8 w-8" />
            Configurações do Sistema
          </h1>
          <p className="text-muted-foreground">
            Gerencie configurações gerais e preferências
          </p>
        </div>

        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Informações da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          companyName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Email da Empresa</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          companyEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Telefone</Label>
                    <Input
                      id="companyPhone"
                      value={settings.companyPhone}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          companyPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) =>
                        setSettings({ ...settings, timezone: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">
                          America/São Paulo (BRT)
                        </SelectItem>
                        <SelectItem value="America/Manaus">
                          America/Manaus (AMT)
                        </SelectItem>
                        <SelectItem value="America/Noronha">
                          America/Noronha (FNT)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={(e) =>
                      setSettings({ ...settings, address: e.target.value })
                    }
                    placeholder="Endereço completo da empresa"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Preferências de Exibição
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) =>
                        setSettings({ ...settings, language: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">
                          Português (Brasil)
                        </SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Select
                      value={settings.currency}
                      onValueChange={(value) =>
                        setSettings({ ...settings, currency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">
                          Real Brasileiro (R$)
                        </SelectItem>
                        <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Formato de Data</Label>
                    <Select
                      value={settings.dateFormat}
                      onValueChange={(value) =>
                        setSettings({ ...settings, dateFormat: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/AAAA</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/AAAA</SelectItem>
                        <SelectItem value="YYYY-MM-DD">AAAA-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="darkMode">Modo Escuro</Label>
                    <Switch
                      id="darkMode"
                      checked={isDarkMode}
                      onCheckedChange={setIsDarkMode}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">
                    Notificações por Email
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações importantes por email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Tipos de Notificação</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Novas viagens registradas</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar quando uma nova viagem for registrada
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Entradas de produtos</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar sobre novas entradas de produtos
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Relatórios semanais</Label>
                      <p className="text-sm text-muted-foreground">
                        Enviar resumo semanal por email
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Alertas de sistema</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar sobre problemas no sistema
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Backup automático</Label>
                      <p className="text-sm text-muted-foreground">
                        Confirmar quando backup for realizado
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Configurações de Email</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">Servidor SMTP</Label>
                    <Input id="smtpServer" placeholder="smtp.gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">Porta SMTP</Label>
                    <Input id="smtpPort" placeholder="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">Usuário SMTP</Label>
                    <Input
                      id="smtpUsername"
                      placeholder="seu-email@gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Senha SMTP</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Testar Configuração
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Tab */}
        <TabsContent value="backup">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Configurações de Backup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoBackup">Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Criar backups automáticos do sistema
                    </p>
                  </div>
                  <Switch
                    id="autoBackup"
                    checked={autoBackup}
                    onCheckedChange={setAutoBackup}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">
                      Frequência de Backup
                    </Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(value) =>
                        setSettings({ ...settings, backupFrequency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">A cada hora</SelectItem>
                        <SelectItem value="daily">Diário</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retentionDays">Retenção (dias)</Label>
                    <Input
                      id="retentionDays"
                      value={settings.retentionDays}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          retentionDays: e.target.value,
                        })
                      }
                      placeholder="30"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Ações de Backup</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleBackupNow}>
                      <HardDrive className="h-4 w-4 mr-2" />
                      Backup Agora
                    </Button>
                    <Button variant="outline" onClick={handleExportData}>
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Dados
                    </Button>
                    <Button variant="outline" onClick={handleImportData}>
                      <Upload className="h-4 w-4 mr-2" />
                      Importar Dados
                    </Button>
                    <Button variant="outline" onClick={handleRestoreBackup}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Restaurar Backup
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Status dos Backups</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Último backup</p>
                          <p className="text-sm text-muted-foreground">
                            Ainda não realizado
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">Manual</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Próximo backup</p>
                          <p className="text-sm text-muted-foreground">
                            Aguardando primeiro backup
                          </p>
                        </div>
                      </div>
                      <Badge>Automático</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Configurações de Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Políticas de Senha</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Exigir senhas complexas</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Expiração de senha (90 dias)</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Histórico de senhas (últimas 5)</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Sessões e Login</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tempo limite da sessão (minutos)</Label>
                      <Input defaultValue="60" />
                    </div>
                    <div className="space-y-2">
                      <Label>Tentativas máximas de login</Label>
                      <Input defaultValue="5" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Login duplo fator (2FA)</Label>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Upload de Arquivos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tamanho máximo (MB)</Label>
                      <Input
                        value={settings.maxFileSize}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            maxFileSize: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tipos permitidos</Label>
                      <Input
                        value={settings.allowedFileTypes}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            allowedFileTypes: e.target.value,
                          })
                        }
                        placeholder="jpg,png,pdf"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Logs de Auditoria</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Registrar ações dos usuários</Label>
                      <p className="text-sm text-muted-foreground">
                        Manter histórico de ações no sistema
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  Informações do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Versão do Sistema</Label>
                    <div className="p-2 bg-muted rounded">v1.0.0</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Última Atualização</Label>
                    <div className="p-2 bg-muted rounded">Janeiro 2024</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Uso do Banco de Dados</Label>
                    <div className="p-2 bg-muted rounded">0 MB</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Espaço de Arquivos</Label>
                    <div className="p-2 bg-muted rounded">0 MB</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Modo de Manutenção
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">
                      Ativar Modo de Manutenção
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Bloqueia acesso de usuários durante manutenção
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
                {maintenanceMode && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Sistema em Manutenção</span>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Apenas administradores podem acessar o sistema
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Trash2 className="h-5 w-5" />
                  Zona de Perigo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-red-600">
                      Resetar Sistema
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Remove todos os dados e volta às configurações padrão
                    </p>
                    <Button
                      variant="destructive"
                      className="mt-2"
                      onClick={handleResetSystem}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Resetar Sistema
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
