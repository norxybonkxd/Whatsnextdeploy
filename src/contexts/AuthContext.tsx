import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthError extends Error {
  code?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  user: UserType | null;
  isLoading: boolean;
  error: AuthError | null;
  clearError: () => void;
}

interface UserType {
  email: string;
  name: string;
  createdAt?: Date;
  lastLogin?: Date;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const clearError = () => {
    setError(null);
  };

  const createAuthError = (message: string, code?: string): AuthError => {
    const error = new Error(message) as AuthError;
    if (code) error.code = code;
    return error;
  };

  const login = async (email: string, password: string) => {
    // In a real application, you would make an API call here
    // This is just a mock implementation
    setIsLoading(true);
    setError(null);

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // Simulate validation
          if (!email || !password) {
            reject(createAuthError('Email and password are required', 'AUTH_MISSING_CREDENTIALS'));
            return;
          }

          if (password.length < 6) {
            reject(createAuthError('Invalid credentials', 'AUTH_INVALID_CREDENTIALS'));
            return;
          }

          // Mock user lookup
          if (email !== 'test@test.com') {
            reject(createAuthError('User not found', 'AUTH_USER_NOT_FOUND'));
            return;
          }

          setIsAuthenticated(true);
          setUser({
            email,
            name: email.split('@')[0],
            lastLogin: new Date(),
          });
          resolve();
        }, 1000);
      });
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    // In a real application, you would make an API call here
    // This is just a mock implementation
    setIsLoading(true);
    setError(null);

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // Validate inputs
          if (!email || !password || !name) {
            reject(createAuthError('All fields are required', 'AUTH_MISSING_FIELDS'));
            return;
          }

          if (password.length < 6) {
            reject(createAuthError('Password must be at least 6 characters', 'AUTH_WEAK_PASSWORD'));
            return;
          }

          // Email format validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            reject(createAuthError('Invalid email format', 'AUTH_INVALID_EMAIL'));
            return;
          }
          
          // Simulate email already exists check
          if (email === 'test@test.com') {
            reject(createAuthError('Email already exists', 'AUTH_EMAIL_IN_USE'));
            return;
          }

          const now = new Date();
          setIsAuthenticated(true);
          setUser({
            email,
            name,
            createdAt: now,
            lastLogin: now,
          });
          resolve();
        }, 1000);
      });
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate async logout
      setTimeout(() => {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      const error = createAuthError('Logout failed', 'AUTH_LOGOUT_FAILED');
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // Validate email
          if (!email) {
            reject(createAuthError('Email is required', 'AUTH_MISSING_EMAIL'));
            return;
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            reject(createAuthError('Invalid email format', 'AUTH_INVALID_EMAIL'));
            return;
          }

          // Mock check if user exists
          if (email !== 'test@test.com') {
            reject(createAuthError('No account found with this email', 'AUTH_USER_NOT_FOUND'));
            return;
          }

          // In a real application, this would send a password reset email
          resolve();
        }, 1000);
      });
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      register, 
      logout, 
      resetPassword,
      user, 
      isLoading,
      error,
      clearError 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}