import React from 'react';
import { Box, Text } from 'native-base';
import { useAuth } from '../../hooks/auth';

export const Header: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Box height={80}>
      <Text>Bem vindo, {user.name}</Text>
    </Box>
  );
};
