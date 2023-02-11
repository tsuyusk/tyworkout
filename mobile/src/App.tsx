import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import { theme } from './styles/theme';
import Routes from './Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RootProvider } from './hooks';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootProvider>
            <Routes />
          </RootProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};
