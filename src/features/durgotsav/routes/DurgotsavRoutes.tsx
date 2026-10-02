import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DurgotsavAuthProvider, useDurgotsavAuth } from "../context/DurgotsavAuthContext";
import { DurgotsavUserLayout } from "../components/layout/DurgotsavUserLayout";
import { DurgotsavAdminLayout } from "../components/layout/DurgotsavAdminLayout";
import { DurgotsavLanding } from "../pages/DurgotsavLanding";
import { DurgotsavLogin } from "../pages/DurgotsavLogin";
import { DurgotsavDashboard } from "../pages/DurgotsavDashboard";
import { DurgotsavMyRegistrations } from "../pages/DurgotsavMyRegistrations";
import { DurgotsavAdminDashboard } from "../pages/admin/DurgotsavAdminDashboard";
import { DurgotsavAdminActivities } from "../pages/admin/DurgotsavAdminActivities";
import { DurgotsavAdminParticipants } from "../pages/admin/DurgotsavAdminParticipants";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

// Guard for routes requiring login (e.g. My Registrations, User Dashboard)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useDurgotsavAuth();

  if (loading) {
    return <LoadingSpinner message="Checking authentication..." fullHeight />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/durgotsav/login" replace />;
  }

  return <>{children}</>;
};

// Guard for routes requiring Admin privileges (UserDirectory.isAdmin === true)
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useDurgotsavAuth();

  if (loading) {
    return <LoadingSpinner message="Verifying admin credentials..." fullHeight />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/durgotsav/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/durgotsav/dashboard" replace />;
  }

  return <>{children}</>;
};

export const DurgotsavRoutes: React.FC = () => {
  return (
    <DurgotsavAuthProvider>
      <Routes>
        {/* User & Public Layout */}
        <Route element={<DurgotsavUserLayout />}>
          <Route index element={<DurgotsavLanding />} />
          <Route path="login" element={<DurgotsavLogin />} />
          <Route path="activities" element={<Navigate to="/durgotsav/admin/activities" replace />} />
          <Route path="activities/:id" element={<Navigate to="/durgotsav/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DurgotsavDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-registrations"
            element={
              <ProtectedRoute>
                <DurgotsavMyRegistrations />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin Layout */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <DurgotsavAdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<DurgotsavAdminDashboard />} />
          <Route path="activities" element={<DurgotsavAdminActivities />} />
          <Route path="participants" element={<DurgotsavAdminParticipants />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/durgotsav" replace />} />
      </Routes>
    </DurgotsavAuthProvider>
  );
};
