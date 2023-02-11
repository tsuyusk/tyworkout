import React, { forwardRef } from 'react';
import { Text, Box, IInputProps, Input as NativeInput } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InputProps extends IInputProps {
  icon?: string;
  placeholder: string;
  tip?: string;
}

export const Input = forwardRef<any, InputProps>(
  ({ tip, icon, ...props }, ref) => {
    return (
      <Box>
        <Box flexDirection="row">
          {icon && <Icon name={icon} />}

          <NativeInput
            width={260}
            color="white"
            borderWidth={0}
            borderBottomWidth={2}
            borderColor="gray.700"
            _focus={{ borderColor: 'primary.400', backgroundColor: 'gray.800' }}
            ref={ref}
            {...props}
          />
        </Box>

        {tip && <Text color="white">{tip}</Text>}
      </Box>
    );
  },
);
