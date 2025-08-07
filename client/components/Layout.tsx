import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Home,
  Truck,
  Package,
  BarChart3,
  Users,
  Settings,
  Menu,
  LogOut,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Filter navigation based on user role
  const allNavigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
      roles: ["admin", "operator", "viewer"],
    },
    {
      name: "Gestão de Combustível",
      href: "/combustivel",
      icon: Truck,
      roles: ["admin", "operator"],
    },
    {
      name: "Entrada de Produtos",
      href: "/produtos",
      icon: Package,
      roles: ["admin", "operator"],
    },
    {
      name: "Relatórios",
      href: "/relatorios",
      icon: BarChart3,
      roles: ["admin", "operator", "viewer"],
    },
    { name: "Usuários", href: "/usuarios", icon: Users, roles: ["admin"] },
    {
      name: "Configurações",
      href: "/configuracoes",
      icon: Settings,
      roles: ["admin"],
    },
  ];

  const navigation = allNavigation.filter(
    (item) => user && item.roles.includes(user.role),
  );

  const isCurrentPath = (href: string) => {
    if (href === "/") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "operator":
        return "Operador";
      case "viewer":
        return "Visualizador";
      default:
        return role;
    }
  };

  const NavigationItems = () => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon;
        const current = isCurrentPath(item.href);

        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              current
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-muted-foreground hover:text-accent-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </>
  );

  const UserSection = () => (
    <div className="border-t pt-4">
      <div className="mb-3 flex justify-center">
        <ThemeToggle />
      </div>

      <div className="mb-4 rounded-lg bg-muted/50 p-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
            <Badge variant="outline" className="text-xs mt-1">
              {user?.role && getRoleLabel(user.role)}
            </Badge>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        size="sm"
        onClick={logout}
      >
        <LogOut className="h-4 w-4" />
        Sair
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-card px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Truck className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">TransporteManager</h1>
                <p className="text-xs text-muted-foreground">
                  Sistema de Gestão
                </p>
              </div>
            </div>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="space-y-1">
                  <NavigationItems />
                </ul>
              </li>

              <li className="mt-auto">
                <UserSection />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-card px-4 shadow-sm sm:gap-x-6 sm:px-6">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                      <Truck className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold">
                        TransporteManager
                      </h1>
                      <p className="text-xs text-muted-foreground">
                        Sistema de Gestão
                      </p>
                    </div>
                  </div>
                </div>

                <nav className="flex flex-1 flex-col">
                  <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul className="space-y-1">
                        <NavigationItems />
                      </ul>
                    </li>

                    <li className="mt-auto">
                      <UserSection />
                    </li>
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary lg:hidden">
                <Truck className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="lg:hidden">
                <h1 className="text-lg font-semibold">TransporteManager</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
