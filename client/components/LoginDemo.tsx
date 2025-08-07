import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginDemo() {
  const { login } = useAuth();

  const handleDemoLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Login Rápido - Demonstração</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          className="w-full"
          onClick={() =>
            handleDemoLogin("admin@transportadora.com", "admin123")
          }
        >
          Login como Administrador
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleDemoLogin("joao@transportadora.com", "joao123")}
        >
          Login como Operador
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            handleDemoLogin("maria@transportadora.com", "maria123")
          }
        >
          Login como Visualizador
        </Button>
      </CardContent>
    </Card>
  );
}
