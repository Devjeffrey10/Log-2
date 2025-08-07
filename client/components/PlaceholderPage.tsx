import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function PlaceholderPage({
  title,
  description,
  icon: Icon = Construction,
}: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Icon className="h-8 w-8" />
            {title}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <Construction className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle>Página em Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Esta funcionalidade está sendo desenvolvida. Em breve você poderá
            acessar todas as ferramentas de {title.toLowerCase()}.
          </p>
          <p className="text-sm text-muted-foreground">
            Continue usando o sistema para registrar viagens e entradas de
            produtos. Solicite ao desenvolvedor para implementar esta página
            quando necessário.
          </p>
          <div className="flex justify-center gap-2 pt-4">
            <Button asChild>
              <Link to="/">Voltar ao Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/combustivel">Gestão de Combustível</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
