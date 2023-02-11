import React from 'react';
import { AuthContextProvider } from './auth';

interface RootProviderProps {
  children: React.ReactNode;
}

export const RootProvider: React.FC<RootProviderProps> = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
