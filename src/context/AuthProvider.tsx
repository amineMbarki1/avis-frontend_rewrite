import httpClient from "@/api/http-client";
import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext<any>({
  token: null,
  isAuthenticated: false,
  login: () => {},
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const login = useCallback(function ({ token, user }) {
    setIsAuthenticated(true);
    setToken(token);
    setUser(user);
    httpClient.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        // Handle request errors
        return Promise.reject(error);
      }
    );
  }, []);
  const logout = useCallback(function () {
    setIsAuthenticated(true);
    setToken(null);
    setUser(null);
    window.location.reload();
  }, []);
  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, user, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
