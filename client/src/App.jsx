import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import AppShell from "./layout/AppShell";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  // 🔐 TEMP: mock auth (replace with real auth later)
  const [user] = useState({
    name: "Amit Sharma",
    role: "super_admin", // change to test roles
  });

  return (
    <Routes>
      {/* ---------- PUBLIC ROUTES ---------- */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ---------- PROTECTED ROUTES ---------- */}
      <Route element={<ProtectedRoute user={user} />}>
        <Route
          path="/"
          element={
            <AppShell user={user}>
              <Home user={user} />
            </AppShell>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AppShell user={user}>
              <Dashboard user={user} />
            </AppShell>
          }
        />
      </Route>

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
