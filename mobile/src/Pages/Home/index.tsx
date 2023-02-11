import { Box, Text } from 'native-base';
import React from 'react';

export const Home: React.FC = () => {
  return (
    <Box
      backgroundColor="gray.800"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Text color="black">Successfully signed in</Text>
    </Box>
  );
};
