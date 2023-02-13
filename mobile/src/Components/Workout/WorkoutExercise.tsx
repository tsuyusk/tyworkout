import React, { useState } from 'react';
import { Box, Text, Checkbox, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WorkoutExercise as WorkoutExerciseModel } from '../../@types/models';

interface WorkoutExerciseProps {
  exercise: WorkoutExerciseModel;
}

export const WorkoutExercise: React.FC<WorkoutExerciseProps> = ({
  exercise,
}) => {
  const {
    colors: { white },
  } = useTheme();

  const [isChecked, setIsChecked] = useState(exercise.done);

  return (
    <>
      <Box flexDirection="row" alignItems="center" key={exercise.id}>
        <Icon name="chevron-right" color={white} size={24} />

        <Box
          flexDirection="row"
          backgroundColor="gray.700"
          p="2"
          borderRadius="md"
          borderTopRightRadius="none"
          borderTopLeftRadius="none"
          w="93%"
        >
          <Checkbox
            value={`${exercise.id}.hasDone`}
            isChecked={isChecked}
            onChange={() => setIsChecked(state => !state)}
          />
          <Box ml="2">
            <Text color="gray.200">{exercise.title}</Text>

            <Text color="gray.400">
              ({exercise.goalReps} reps, {exercise.goalSets} sets)
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};
