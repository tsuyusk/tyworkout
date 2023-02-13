import React, { useState } from 'react';
import { Box, Text, Checkbox } from 'native-base';

import { Workout as WorkoutModel } from '../../@types/models';
import { WorkoutExercise } from './WorkoutExercise';

interface WorkoutProps {
  workout: WorkoutModel;
}

export const Workout: React.FC<WorkoutProps> = ({ workout }) => {
  const [isChecked, setIsChecked] = useState(workout.done);

  return (
    <Box borderRadius="md" w="100%">
      <Box
        backgroundColor="gray.700"
        p="4"
        flexDirection="row"
        alignItems="flex-end"
      >
        <Checkbox
          value="hasDone"
          isChecked={isChecked}
          onChange={() => setIsChecked(state => !state)}
        />

        <Text fontSize="lg" ml="4" color="white">
          {workout.title}
        </Text>
      </Box>

      {workout.exercises.map(exercise => (
        <WorkoutExercise key={exercise.id} exercise={exercise} />
      ))}
    </Box>
  );
};
