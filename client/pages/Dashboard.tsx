import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Package,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Clean slate - no demo data
  const stats = {
    totalTrips: 0,
    totalFuelCost: 0,
    totalTonnage: 0,
    activeDrivers: 0,
    monthlyTrips: 0,
    avgFuelCost: 0,
  };

  const recentTrips: any[] = [];
  const recentEntries: any[] = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema de gestão
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/combustivel">
              <Truck className="h-4 w-4 mr-2" />
              Nova Viagem
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/produtos">
              <Package className="h-4 w-4 mr-2" />
              Nova Entrada
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Viagens
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTrips}</div>
            <p className="text-xs text-muted-foreground">
              Nenhuma viagem registrada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Custo Total Combustível
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R${" "}
              {stats.totalFuelCost.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Nenhum custo registrado
            </p>
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
              {stats.totalTonnage.toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">
              Nenhum produto recebido
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Motoristas Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDrivers}</div>
            <p className="text-xs text-muted-foreground">
              Nenhum motorista ativo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Viagens Este Mês
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyTrips}</div>
            <p className="text-xs text-muted-foreground">
              Nenhuma viagem este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendência</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">--</div>
            <p className="text-xs text-muted-foreground">
              Sem dados suficientes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Viagens Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrips.length === 0 ? (
                <div className="text-center py-8">
                  <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Nenhuma viagem registrada
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Comece registrando sua primeira viagem
                  </p>
                </div>
              ) : (
                recentTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{trip.driver}</p>
                      <p className="text-sm text-muted-foreground">
                        {trip.destination} • {trip.plate}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(trip.date).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ {trip.cost.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/combustivel">
                {recentTrips.length === 0
                  ? "Registrar Primeira Viagem"
                  : "Ver Todas as Viagens"}
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Product Entries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Entradas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEntries.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Nenhuma entrada registrada
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Comece registrando sua primeira entrada de produto
                  </p>
                </div>
              ) : (
                recentEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{entry.product}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.supplier}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{entry.tonnage}t</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/produtos">
                {recentEntries.length === 0
                  ? "Registrar Primeira Entrada"
                  : "Ver Todas as Entradas"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
