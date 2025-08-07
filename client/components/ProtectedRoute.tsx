import { useAuth } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  try {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      );
    }

    if (!user) {
      return <Login />;
    }

    return <>{children}</>;
  } catch (error) {
    // Fallback to login if auth context is not available
    return <Login />;
  }
}
