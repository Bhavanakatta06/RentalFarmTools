import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api"; // ✅ your Axios instance

export interface User {
  id?: number;
  name?: string;
  email: string;
  phone?: string;
  location?: string;
  password?: string;
}

interface AuthResponse {
  status: string;
  message?: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RefreshResponse {
  token: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Load saved session once on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedAccessToken = localStorage.getItem("accessToken");
    const savedRefreshToken = localStorage.getItem("refreshToken");
    if (savedUser && savedAccessToken && savedRefreshToken) {
      setUser(JSON.parse(savedUser));
      setAccessToken(savedAccessToken);
      setRefreshToken(savedRefreshToken);
      setIsAuthenticated(true);
    }
  }, []);

  // 🔹 Login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", { email, password });
      const data = response.data;

      if (data.status === "success") {
        const { user: loggedInUser, accessToken: at, refreshToken: rt } = data;
        setUser(loggedInUser);
        setAccessToken(at);
        setRefreshToken(rt);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("accessToken", at);
        localStorage.setItem("refreshToken", rt);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Login error:", error.response?.data?.message || error.message);
      return false;
    }
  };

  // 🔹 Register
  const register = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    try {
      const response = await api.post<AuthResponse>("/auth/register", userData);
      const data = response.data;

      if (data.status === "success") {
        const { user: newUser, accessToken: at, refreshToken: rt } = data;
        setUser(newUser);
        setAccessToken(at);
        setRefreshToken(rt);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("accessToken", at);
        localStorage.setItem("refreshToken", rt);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Register error:", error.response?.data?.message || error.message);
      return false;
    }
  };

  // 🔹 Refresh Access Token (safe, throttled)
  const refreshAccessToken = async (): Promise<void> => {
    if (!refreshToken) return;
    try {
      const response = await api.post<RefreshResponse>("/auth/refresh", { refreshToken });
      const data = response.data;
      setAccessToken(data.token);
      localStorage.setItem("accessToken", data.token);
      console.log("Access token refreshed");
    } catch (error: any) {
      console.error("Refresh token error:", error.response?.data?.message || error.message);
      logout();
    }
  };

  // ✅ Run refresh only every 15 minutes, not in a loop
  useEffect(() => {
    if (!refreshToken) return;
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 15 * 60 * 1000); // every 15 minutes
    return () => clearInterval(interval);
  }, [refreshToken]);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, refreshToken, setUser, login, register, logout, isAuthenticated, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
