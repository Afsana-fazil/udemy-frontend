"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { login as loginService, register as registerService, logout as logoutService, getUserFromToken, getToken, setToken, removeToken } from "../services/auth";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  updateUser: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = getToken();
    setTokenState(t);
    if (t) {
      const userData = getUserFromToken(t);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginService(username, password);
      if (data.status === 'success' && data.data?.token) {
        setToken(data.data.token);
        setTokenState(data.data.token);
        const userData = getUserFromToken(data.data.token);
        setUser(userData);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    setLoading(true);
    try {
      const data = await registerService(fullName, email, password);
      if (data.status === 'success' && data.data?.token) {
        setToken(data.data.token);
        setTokenState(data.data.token);
        const userData = getUserFromToken(data.data.token);
        setUser(userData);
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setTokenState(null);
  };

  const updateUser = (userData: any) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, token, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}; 