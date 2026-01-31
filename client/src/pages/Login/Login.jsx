import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
  LogIn,
  Building,
  UserCheck,
  Fingerprint,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios"; // Import axios instance

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      // Use axios for API call
      const response = await api.post("/auth/login", { email, password });

      if (response.data.success && response.data.token) {
        // Store token
        localStorage.setItem("token", response.data.token);
        
        // Call onLogin callback with user data
        if (onLogin) {
          onLogin(response.data.user, response.data.token);
        }
        
        // Navigate to dashboard
        navigate("/app");
      } else {
        setError(response.data.message || "Authentication failed");
      }
    } catch (err) {
      // Handle axios errors
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data.message || "Authentication failed";
        
        // Handle specific error cases
        if (err.response.status === 403 && err.response.data.status === 'pending') {
          setError("Your account is pending approval. Please contact your administrator.");
        } else if (err.response.status === 403) {
          setError(`Account is ${err.response.data.message?.toLowerCase()}. Please contact administrator.`);
        } else if (err.response.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else if (err.response.status === 404) {
          setError("No account found with this email address.");
        } else {
          setError(errorMessage);
        }
      } else if (err.request) {
        // Request was made but no response
        setError("Network error. Please check your connection and try again.");
      } else {
        // Something else happened
        setError(err.message || "An error occurred during login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    setEmail(`${role}@gmail.com`);
    setPassword("Keshab@1234");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-300/10 dark:bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-300/5 dark:bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* Left Panel - Branding & Info */}
        <div className="hidden md:flex flex-col items-start justify-center w-1/2 space-y-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img
                src="/only_logo.png"
                className="w-16 h-16 drop-shadow-lg"
                alt="ASES Logo"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                ASES
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Advanced Safety and Efficiency Systems
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Enterprise-Grade Security
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Military-grade encryption and multi-factor authentication
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-sky-600 dark:text-sky-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Compliance Ready
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Meets ISO 45001, OSHA, and industry safety standards
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Role-Based Access
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Granular permissions for safety officers, managers, and
                  auditors
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-sky-500/10 to-emerald-500/10 border border-sky-200 dark:border-sky-800 rounded-xl p-4">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              "ASES reduced our incident response time by 68% and improved
              compliance by 45%"
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              — Global Manufacturing Corp
            </p>
          </div>
        </div>

        {/* Right Panel - Login Card */}
        <Card className="w-full max-w-md shadow-2xl border-slate-200 dark:border-slate-800 backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 overflow-hidden">
          {/* Card Header */}
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 dark:from-sky-900/30 dark:to-emerald-900/30 flex items-center justify-center border border-sky-200 dark:border-sky-800">
                  <img
                    src="/only_logo.png"
                    className="w-12 h-12"
                    alt="ASES Logo"
                  />
                </div>
                <Fingerprint className="absolute -bottom-2 -right-2 w-8 h-8 p-1.5 bg-emerald-500 text-white rounded-full border-2 border-white dark:border-slate-900" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  Secure Access Portal
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Sign in to your ASES dashboard
                </p>
              </div>
            </div>

            {error && (
              <Alert
                variant="destructive"
                className="animate-in fade-in duration-300"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}
          </CardHeader>

          {/* Card Content */}
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Work Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sky-600 dark:text-sky-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer h-11 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 text-white">
                    <LogIn className="w-4 h-4" />
                    Sign in to Dashboard
                  </span>
                )}
              </Button>
              
              <div className="space-y-2 mt-4">
                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  Demo Accounts (for testing):
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("super_admin")}
                    className="text-xs"
                  >
                    Super Admin
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("group_admin")}
                    className="text-xs"
                  >
                    Group Admin
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("team_admin")}
                    className="text-xs"
                  >
                    Team Admin
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("employee")}
                    className="text-xs"
                  >
                    Employee
                  </Button>
                </div>
              </div>
              
              <div className="text-center pt-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex flex-col space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-center text-muted-foreground">
              <Shield className="inline w-3 h-3 mr-1" />
              Protected by AES-256 encryption
            </p>
            <p className="text-xs text-center text-muted-foreground">
              For security assistance, contact{" "}
              <a
                href="mailto:support@ases.com"
                className="text-sky-600 dark:text-sky-400 hover:underline"
              >
                support@ases.com
              </a>
            </p>
          </CardFooter>
        </Card>

        {/* Mobile Branding */}
        <div className="md:hidden flex flex-col items-center justify-center mt-8 space-y-4">
          <div className="flex items-center gap-3">
            <img src="/only_logo.png" className="w-12 h-12" alt="ASES Logo" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                ASES
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Advanced Safety and Efficiency Systems
              </p>
            </div>
          </div>
          <p className="text-sm text-center text-slate-500 dark:text-slate-400 max-w-sm">
            AI-powered predictive HSE intelligence for modern enterprises
          </p>
        </div>
      </div>

      {/* Security Badge */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Shield className="w-3 h-3" />
        <span>ISO 27001 Certified • GDPR Compliant • SOC 2 Type II</span>
      </div>
    </div>
  );
}