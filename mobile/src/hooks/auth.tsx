import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [hasRunUseEffect, setHasRunUseEffect] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const storagedUser = await AsyncStorage.getItem('@TYWorkout/User');
      const storagedToken = await AsyncStorage.getItem('@TYWorkout/Token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.authorization = JSON.parse(storagedToken);
      }

      setHasRunUseEffect(true);
    })();
  }, []);

  const login = async (userData: User, token: string) => {
    const bearerToken = `Bearer ${token}`;

    api.defaults.headers.authorization = bearerToken;

    await AsyncStorage.setItem('@TYWorkout/User', JSON.stringify(user));
    await AsyncStorage.setItem('@TYWorkout/Token', JSON.stringify(bearerToken));

    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);

    await AsyncStorage.removeItem('@TYWorkout/User');
    await AsyncStorage.removeItem('@TYWorkout/Token');
  };

  if (!hasRunUseEffect) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthContext, AuthContextProvider, useAuth };
