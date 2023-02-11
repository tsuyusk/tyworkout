import React, { useRef, useCallback } from 'react';
import { z } from 'zod';
import { TouchableOpacity, Platform, Alert } from 'react-native';
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
import { api } from '../../services/api';
import { useMutation } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { AxiosError } from 'axios';

interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createAccountFetch = (userData: IRegisterFormData) => {
  return api.post('/users', userData);
};

export const Register: React.FC = () => {
  const inputs = useRef<any>({});
  const { navigate } = useNavigation();
  const createAccountMutation = useMutation(createAccountFetch);
  const { handleSubmit, control } = useForm();

  const onSubmit = useCallback(
    async (data: IRegisterFormData) => {
      if (createAccountMutation.isLoading) {
        return;
      }

      const schema = z
        .object({
          name: z.string().min(3),
          email: z.string().email(),
          password: z.string().min(6),
          password_confirmation: z.string().min(6),
        })
        .refine(
          schemaData =>
            schemaData.password === schemaData.password_confirmation,
          {
            message: "Passwords don't match",
            path: ['password_confirmation'],
          },
        );

      const schemaResponse = schema.safeParse(data);

      if (!schemaResponse.success) {
        if (
          schemaResponse.error.errors.some(
            error => error.message === "Passwords don't match",
          )
        ) {
          Alert.alert(
            "Password don't match",
            "Your passwords don't match, correct them and try again",
          );
          return;
        }
      }

      createAccountMutation.mutate(data, {
        onSuccess: () => {
          Alert.alert(
            'Your account was successfully created!',
            'Now, you may sign in in your account (:',
          );

          navigate('Login' as never);
        },
        onError: error => {
          if (error instanceof AxiosError) {
            if (error?.response?.data.message === 'E-mail already taken') {
              Alert.alert(
                'E-Mail already taken',
                'An account with this e-mail already exists, try another one ):',
              );
              return;
            }

            return;
          }
        },
      });
    },
    [createAccountMutation, navigate],
  );

  return (
    <KeyboardAvoidingView
      backgroundColor="gray.800"
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ paddingVertical: 36 }} flex={1}>
        <Stack
          justifyContent="center"
          alignItems="center"
          background="gray.800"
          flex={1}
          space="5"
        >
          <Image source={logo} borderRadius={220} size={220} alt="Logo" />
          <Text fontFamily="heading" w="250" fontSize="xl" color="white">
            Create an Account
          </Text>

          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={() => inputs.current?.email.focus()}
                ref={input => {
                  inputs.current.name = input;
                }}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={() => inputs.current?.password.focus()}
                ref={input => {
                  inputs.current.email = input;
                }}
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
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={() =>
                  inputs.current?.password_confirmation.focus()
                }
                ref={input => {
                  inputs.current.password = input;
                }}
              />
            )}
          />

          <Controller
            name="password_confirmation"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirm Password"
                type="password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="done"
                ref={input => {
                  inputs.current.password_confirmation = input;
                }}
              />
            )}
          />

          <Button
            backgroundColor="primary.400"
            onPress={handleSubmit(onSubmit as any)}
            loading={createAccountMutation.isLoading}
          >
            Create
          </Button>

          <TouchableOpacity onPress={() => navigate('Login' as never)}>
            <Box w="250">
              <Text color="white">
                Do you already have an account ?
                <Text color="primary.400"> Sign In</Text>
              </Text>
            </Box>
          </TouchableOpacity>
        </Stack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
