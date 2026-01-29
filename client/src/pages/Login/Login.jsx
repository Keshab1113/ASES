import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Backend handles auth + role-based redirect
    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4">
      {/* Theme Toggle */}
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md shadow-xl border">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">ASES</h1>
          <p className="text-sm text-muted-foreground">
            Advanced Safety and Efficiency Systems
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Secure access for authorized personnel only
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
