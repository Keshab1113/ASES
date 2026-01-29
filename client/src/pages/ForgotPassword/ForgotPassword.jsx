import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Backend handles reset email / OTP
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4">

      {/* Theme Toggle */}
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md shadow-xl border">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground">
            ASES — Advanced Safety and Efficiency Systems
          </p>
        </CardHeader>

        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending reset link..." : "Send reset link"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We’ll send password reset instructions to your email
              </p>
            </form>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-sm font-medium">
                Check your email
              </p>
              <p className="text-xs text-muted-foreground">
                If an account exists for <strong>{email}</strong>,  
                you’ll receive password reset instructions shortly.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
