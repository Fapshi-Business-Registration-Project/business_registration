"use client";

import { useState, useEffect, createContext, useContext, useCallback, useMemo } from "react";
import type { User } from "@/types";

// Define a type for the data as it's stored in localStorage.
// This includes the password and keeps 'createdAt' as a string.
type UserInDB = {
  name: string;
  email: string;
  password: string; // The password is needed for authentication
  createdAt: string;  // localStorage stores strings, not Date objects
};

// --- Helper Functions to interact with our mock localStorage DB ---

const getUsersFromDB = (): Record<string, UserInDB> => {
  if (typeof window === 'undefined') return {};
  const db = localStorage.getItem("fapshi-users-db");
  return db ? JSON.parse(db) : {};
};

const saveUsersToDB = (db: Record<string, UserInDB>) => {
  localStorage.setItem("fapshi-users-db", JSON.stringify(db));
};


// --- Auth Context Definition ---

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


// --- Auth Provider Component ---

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On initial load, check if a user session exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("fapshi-user-session");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure the stored string date is converted back to a Date object
        setUser({ ...parsedUser, createdAt: new Date(parsedUser.createdAt) });
      } catch (error) {
        console.error("Failed to parse stored user session:", error);
        localStorage.removeItem("fapshi-user-session");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const usersDB = getUsersFromDB();
      const userData = usersDB[email]; // Direct lookup is more efficient
      
      if (!userData || userData.password !== password) {
        throw new Error("Invalid email or password.");
      }
      
      // Convert the UserInDB object to a User object for the active session
      const loggedInUser: User = {
        id: userData.email,
        email: userData.email,
        name: userData.name,
        createdAt: new Date(userData.createdAt), // Convert string to Date
      };

      setUser(loggedInUser);
      localStorage.setItem("fapshi-user-session", JSON.stringify(loggedInUser));

    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const usersDB = getUsersFromDB();
      if (usersDB[email]) {
        throw new Error("User with this email already exists.");
      }

      const newUserDBEntry: UserInDB = {
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      usersDB[email] = newUserDBEntry;
      saveUsersToDB(usersDB);
      
      // Automatically log the user in after registration
      await login(email, password);

    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("fapshi-user-session");
  }, []);

  // ✅ Memoize the context value.
  // This is a crucial optimization that prevents child components from re-rendering
  // unnecessarily. The context value object will only be recreated if `user` or `isLoading` changes.
  const value = useMemo(() => ({
    user,
    isLoading,
    login,
    register,
    logout
  }), [user, isLoading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


// --- Custom Hook to consume the context ---

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
