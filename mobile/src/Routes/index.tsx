import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Header } from '../Components/Header';
import { nonAuthedRoutes } from './NonAuthed.routes';
import { useAuth } from '../hooks/auth';
import { authedRoutes } from './Authed.routes';

export const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
    >
      {isAuthenticated ? authedRoutes : nonAuthedRoutes}
    </Stack.Navigator>
  );
};

export default Routes;
