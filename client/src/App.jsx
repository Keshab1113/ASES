import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import AppShell from "./layout/AppShell";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Landing from "./pages/Landing/Landing";
import ExecutiveSummary from "./pages/ExecutiveSummary/ExecutiveSummary";
import Tasks from "./pages/Tasks/Tasks";
import Signup from "./pages/Signup/Signup";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Groups from "./pages/Groups/Groups";
import Teams from "./pages/Teams/Teams";
import Users from "./pages/Users/Users";

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
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Landing />} />
      {/* ---------- PROTECTED ROUTES ---------- */}
      <Route element={<ProtectedRoute user={user} />}>
        <Route
          path="/app"
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

      <Route
          path="/executive"
          element={
            <AppShell user={user}>
              <ExecutiveSummary />
            </AppShell>
          }
        />

        <Route
          path="/tasks"
          element={
            <AppShell user={user}>
              <Tasks/>
            </AppShell>
          }
        />
        <Route
          path="/profile"
          element={
            <AppShell user={user}>
              <ProfilePage/>
            </AppShell>
          }
        />
        <Route
          path="/groups"
          element={
            <AppShell user={user}>
              <Groups/>
            </AppShell>
          }
        />
        <Route
          path="/teams"
          element={
            <AppShell user={user}>
              <Teams/>
            </AppShell>
          }
        />
        <Route
          path="/users"
          element={
            <AppShell user={user}>
              <Users/>
            </AppShell>
          }
        />

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
