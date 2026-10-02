import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthCheckResponse, DurgotsavUser, LoginResponse, RegisterRequest } from "../types/durgotsav";
import { getAuthProfile, loginWithPhone, registerUser } from "../services/durgotsavApi";
import { authStorage } from "../services/authStorage";

interface DurgotsavAuthContextType {
  user: DurgotsavUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  checkOrLogin: (phone: string) => Promise<AuthCheckResponse>;
  register: (data: RegisterRequest) => Promise<LoginResponse>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const DurgotsavAuthContext = createContext<DurgotsavAuthContextType | undefined>(undefined);

export const DurgotsavAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DurgotsavUser | null>(() => authStorage.getUser());
  const [token, setToken] = useState<string | null>(() => authStorage.getToken());
  const [loading, setLoading] = useState<boolean>(true);

  // Synchronize authentication on initial mount using sessionStorage
  useEffect(() => {
    async function verifyAuth() {
      const storedToken = authStorage.getToken();
      if (storedToken) {
        try {
          const res = await getAuthProfile();
          if (res.success && res.user) {
            setUser(res.user);
            authStorage.setUser(res.user);
          }
        } catch {
          // Token expired or invalid
          authStorage.clearSession();
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    }

    verifyAuth();
  }, []);

  /**
   * Check phone or Login existing user
   */
  const checkOrLogin = async (phone: string): Promise<AuthCheckResponse> => {
    const response = await loginWithPhone(phone);
    if (!response.isNewUser && response.token && response.user) {
      authStorage.setSession(response.token, response.user);
      setToken(response.token);
      setUser(response.user);
    }
    return response;
  };

  /**
   * Register new user and authenticate
   */
  const register = async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await registerUser(data);
    if (response.success && response.token && response.user) {
      authStorage.setSession(response.token, response.user);
      setToken(response.token);
      setUser(response.user);
    }
    return response;
  };

  /**
   * Logout user from Durgotsav session
   */
  const logout = () => {
    authStorage.clearSession();
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await getAuthProfile();
      if (res.success && res.user) {
        setUser(res.user);
        authStorage.setUser(res.user);
      }
    } catch (err) {
      console.error("Failed to refresh Durgotsav user profile:", err);
    }
  };

  const isAuthenticated = Boolean(token && user);
  const isAdmin = Boolean(user?.isAdmin === true);

  return (
    <DurgotsavAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        loading,
        checkOrLogin,
        register,
        logout,
        refreshUser
      }}
    >
      {children}
    </DurgotsavAuthContext.Provider>
  );
};

export const useDurgotsavAuth = (): DurgotsavAuthContextType => {
  const context = useContext(DurgotsavAuthContext);
  if (!context) {
    throw new Error("useDurgotsavAuth must be used within a DurgotsavAuthProvider");
  }
  return context;
};
