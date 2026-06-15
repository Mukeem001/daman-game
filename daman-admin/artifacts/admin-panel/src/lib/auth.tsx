import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "./hooks";
import { Loader2 } from "lucide-react";

interface Admin {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const [, setLocation] = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setLocation("/login");
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setLocation("/dashboard");
  };

  return { logout, login };
}

export function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const [, setLocation] = useLocation();
  const token = localStorage.getItem("token");
  
  const { data: admin, isLoading, isError } = useQuery<Admin>(
    "/auth/me",
    {
      enabled: !!token,
    }
  );

  useEffect(() => {
    if (!token || isError) {
      localStorage.removeItem("token");
      setLocation("/login");
    }
  }, [token, isError, setLocation]);

  if (!token) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium animate-pulse">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  return <Component />;
}
