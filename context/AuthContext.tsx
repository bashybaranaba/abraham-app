"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { IAdapter, IProvider } from "@web3auth/base";
import { web3auth, web3AuthOptions } from "@/lib/web3AuthConfig";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";

// Define the AuthContext type
interface AuthContextType {
  idToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loggedIn: boolean;
  provider: IProvider | null;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// The AuthProvider component to wrap the app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [idToken, setIdToken] = useState<string | null>(
    () => localStorage.getItem("idToken") || null
  );
  const [loggedIn, setLoggedIn] = useState(!!idToken);
  const [provider, setProvider] = useState<IProvider | null>(null);

  useEffect(() => {
    // Initialize Web3Auth and check login status
    const initWeb3Auth = async () => {
      try {
        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter: IAdapter<unknown>) => {
          web3auth.configureAdapter(adapter);
        });

        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected && idToken) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
      }
    };

    initWeb3Auth();
  }, [idToken]);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);

      if (web3auth.connected) {
        setLoggedIn(true);
        const tokenResponse = await web3auth.authenticateUser();
        setIdToken(tokenResponse.idToken);
        localStorage.setItem("idToken", tokenResponse.idToken); // Persist the token
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      setIdToken(null);
      localStorage.removeItem("idToken"); // Clear token on logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ idToken, login, logout, loggedIn, provider }}
    >
      {children}
    </AuthContext.Provider>
  );
}
