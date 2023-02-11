import React from 'react';

import { Login } from '../Pages/Login';
import { Register } from '../Pages/Register';
import { Stack } from '.';

export const nonAuthedRoutes = [
  <Stack.Screen
    key="Login"
    name="Login"
    component={Login}
    options={{ header: () => null }}
  />,
  <Stack.Screen
    key="Register"
    name="Register"
    component={Register}
    options={{ header: () => null }}
  />,
];
