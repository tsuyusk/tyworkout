import { Box, Text, Button, useTheme } from 'native-base';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { api } from '../../services/api';
import { Workout as WorkoutModel } from '../../@types/models';
import { useQuery } from 'react-query';
import { Workout } from '../../Components/Workout';

const getfetchWorkoutsForToday = async () => {
  return api.get<WorkoutModel[]>('/workout/today').then(res => res.data);
};

export const Home: React.FC = () => {
  const { data, isLoading } = useQuery(
    'workout/today',
    getfetchWorkoutsForToday,
  );
  const {
    colors: { white, primary },
  } = useTheme();

  if (isLoading || !data) {
    return (
      <Box
        backgroundColor="gray.800"
        flex={1}
        alignItems="center"
        justifyContent="center"
      >
        <ActivityIndicator size="large" color={primary[400]} />
      </Box>
    );
  }

  return (
    <>
      <Box backgroundColor="gray.800" flex={1} p="4">
        <Box>
          <Text fontSize="xl" color="primary.400" fontFamily="heading" w="50%">
            Welcome!
          </Text>
          <Text fontSize="xl" color="white" fontFamily="heading" w="100%">
            These are your <Text color="primary.400">workouts</Text> for today
          </Text>
        </Box>

        <Box w="100%" height="1px" backgroundColor="gray.900" my="4" />

        {data.length === 0 && (
          <Text color="white">You have no workout for today (:</Text>
        )}
        {data.map(workout => (
          <Workout key={workout.id} workout={workout} />
        ))}
      </Box>

      <Button
        borderRadius="full"
        w="16"
        h="16"
        position="absolute"
        right="2"
        bottom="2"
        shadow="6"
      >
        <Icon name="add" color={white} size={24} />
      </Button>
    </>
  );
};
