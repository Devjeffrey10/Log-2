import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  DollarSign,
  Truck,
  Package,
  Users,
  FileText,
  Filter,
  PieChart,
  BarChart2,
} from "lucide-react";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-01-31");
  const [reportType, setReportType] = useState("monthly");

  // Mock data for demonstration
  const summaryStats = {
    totalTrips: 0,
    totalFuelCost: 0,
    totalTonnage: 0,
    avgCostPerTrip: 0,
    avgTonnagePerEntry: 0,
    mostActiveDriver: "N/A",
    mostUsedRoute: "N/A",
    topSupplier: "N/A",
  };

  const monthlyData = [
    { month: "Jan", trips: 0, fuelCost: 0, tonnage: 0 },
    { month: "Fev", trips: 0, fuelCost: 0, tonnage: 0 },
    { month: "Mar", trips: 0, fuelCost: 0, tonnage: 0 },
    { month: "Abr", trips: 0, fuelCost: 0, tonnage: 0 },
    { month: "Mai", trips: 0, fuelCost: 0, tonnage: 0 },
    { month: "Jun", trips: 0, fuelCost: 0, tonnage: 0 },
  ];

  const driverPerformance = [];
  const routeAnalysis = [];
  const supplierAnalysis = [];
  const costAnalysis = [];

  const handleExportReport = (format: string) => {
    // Implementation for exporting reports
    console.log(`Exporting report in ${format} format`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            Relatórios e Análises
          </h1>
          <p className="text-muted-foreground">
            Dashboard analítico do sistema de gestão
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportReport("pdf")}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => handleExportReport("excel")}>
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      {/* Date Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Período
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateFrom">Data Inicial</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">Data Final</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reportType">Tipo de Relatório</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                  <SelectItem value="yearly">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button>Atualizar Relatório</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="fuel">Combustível</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Viagens
                  </CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {summaryStats.totalTrips}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    No período selecionado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Custo Total
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    R${" "}
                    {summaryStats.totalFuelCost.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">Combustível</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Toneladas
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {summaryStats.totalTonnage}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Produtos transportados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Média por Viagem
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    R$ {summaryStats.avgCostPerTrip.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">Custo médio</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5" />
                    Evolução Mensal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Gráfico de evolução mensal
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Dados serão exibidos quando houver registros
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Distribuição de Custos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Gráfico de distribuição
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Análise de custos por categoria
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Motorista Mais Ativo</h4>
                    <p className="text-2xl font-bold">
                      {summaryStats.mostActiveDriver}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {summaryStats.totalTrips === 0
                        ? "Nenhum dado disponível"
                        : `${summaryStats.totalTrips} viagens`}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Rota Mais Utilizada</h4>
                    <p className="text-2xl font-bold">
                      {summaryStats.mostUsedRoute}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {summaryStats.totalTrips === 0
                        ? "Nenhum dado disponível"
                        : "Frequência de uso"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Principal Fornecedor</h4>
                    <p className="text-2xl font-bold">
                      {summaryStats.topSupplier}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {summaryStats.totalTonnage === 0
                        ? "Nenhum dado disponível"
                        : `${summaryStats.totalTonnage}t fornecidas`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Fuel Reports Tab */}
        <TabsContent value="fuel">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Combustível</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Custo Total
                        </p>
                        <p className="text-2xl font-bold">R$ 0,00</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Custo Médio/Viagem
                        </p>
                        <p className="text-2xl font-bold">R$ 0,00</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Viagens</p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <Truck className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Detalhes por Período</h4>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Período</TableHead>
                          <TableHead>Viagens</TableHead>
                          <TableHead>Custo Total</TableHead>
                          <TableHead>Custo Médio</TableHead>
                          <TableHead>Variação</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-8 text-muted-foreground"
                          >
                            Nenhum dado de combustível disponível no período
                            selecionado
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Reports Tab */}
        <TabsContent value="products">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Recebido
                        </p>
                        <p className="text-2xl font-bold">0t</p>
                      </div>
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Entradas
                        </p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Média/Entrada
                        </p>
                        <p className="text-2xl font-bold">0t</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Análise por Produto</h4>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produto</TableHead>
                          <TableHead>Entradas</TableHead>
                          <TableHead>Total (t)</TableHead>
                          <TableHead>Média/Entrada</TableHead>
                          <TableHead>Principais Fornecedores</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-8 text-muted-foreground"
                          >
                            Nenhum dado de produtos disponível no período
                            selecionado
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance dos Motoristas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Motorista</TableHead>
                            <TableHead>Viagens</TableHead>
                            <TableHead>Custo Total</TableHead>
                            <TableHead>Média</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center py-8 text-muted-foreground"
                            >
                              Nenhum dado de performance disponível
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Análise de Rotas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Destino</TableHead>
                            <TableHead>Viagens</TableHead>
                            <TableHead>Frequência</TableHead>
                            <TableHead>Custo Médio</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center py-8 text-muted-foreground"
                            >
                              Nenhum dado de rotas disponível
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fornecedores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fornecedor</TableHead>
                        <TableHead>Entregas</TableHead>
                        <TableHead>Total (t)</TableHead>
                        <TableHead>Principais Produtos</TableHead>
                        <TableHead>Última Entrega</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-8 text-muted-foreground"
                        >
                          Nenhum dado de fornecedores disponível
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
