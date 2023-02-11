import React, { useCallback, useRef } from 'react';
import { Alert, TouchableOpacity, Platform } from 'react-native';
import { z } from 'zod';
import {
  Box,
  Image,
  Stack,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'native-base';

import logo from '../../assets/logo.png';

import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { api } from '../../services/api';
import { AxiosError } from 'axios';
import { useAuth } from '../../hooks/auth';

interface ILoginFormData {
  email: string;
  password: string;
}

const loginFetch = (loginData: ILoginFormData) => {
  return api.post('/users/auth', loginData);
};

export const Login: React.FC = () => {
  const { login } = useAuth();
  const inputs = useRef<any>({});
  const loginMutation = useMutation(loginFetch);
  const { handleSubmit, control } = useForm();
  const { navigate } = useNavigation();

  const onSubmit = useCallback(
    (data: ILoginFormData) => {
      if (loginMutation.isLoading) {
        return;
      }

      const schema = z.object({
        email: z.string().email(),
        password: z.string(),
      });

      const schemaResponse = schema.safeParse(data);

      if (!schemaResponse.success) {
        return;
      }

      loginMutation.mutate(data, {
        onSuccess: successData => {
          login(successData.data.user, successData.data.token);
        },
        onError: error => {
          if (error instanceof AxiosError) {
            if (
              error.response?.data.message ===
              'The E-mail/Password combination is invalid'
            ) {
              Alert.alert(
                "We couldn't find an account with the data you inserted",
                "Oof, that's tough! Check the data and try again",
              );

              return;
            }

            return;
          }
        },
      });
    },
    [loginMutation, login],
  );

  return (
    <KeyboardAvoidingView
      backgroundColor="gray.800"
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ paddingVertical: 36 }} flex={1}>
        <Stack justifyContent="center" alignItems="center" flex={1} space="5">
          <Image source={logo} borderRadius={220} size={220} alt="Logo" />

          <Text fontFamily="heading" w="250" fontSize="xl" color="white">
            Login
          </Text>

          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                onSubmitEditing={() => inputs.current.password.focus()}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Password"
                type="password"
                returnKeyType="next"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={input => (inputs.current.password = input)}
              />
            )}
          />

          <Button
            onPress={handleSubmit(onSubmit as any)}
            backgroundColor="primary.400"
            loading={loginMutation.isLoading}
          >
            Login
          </Button>

          <TouchableOpacity onPress={() => navigate('Register' as never)}>
            <Box w="250">
              <Text color="white">
                Don't have an account ?
                <Text color="primary.400"> Create one</Text>
              </Text>
            </Box>
          </TouchableOpacity>
        </Stack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
