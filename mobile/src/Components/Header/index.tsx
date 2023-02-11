import React, { useCallback } from 'react';
import { Box, Image, Text } from 'native-base';
import { useAuth } from '../../hooks/auth';
import { TouchableOpacity } from 'react-native';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleGoToAvatar = useCallback(() => {
    logout();
  }, [logout]);

  if (!user) {
    return null;
  }

  return (
    <Box
      height="16"
      background="gray.900"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      padding="4"
    >
      <Text color="white" fontSize="md">
        Bem vindo, <Text color="primary.400">{user.name}</Text>
      </Text>

      <TouchableOpacity onPress={handleGoToAvatar}>
        <Image
          borderRadius="full"
          w="12"
          h="12"
          source={{ uri: user.image }}
          alt="User image"
        />
      </TouchableOpacity>
    </Box>
  );
};
