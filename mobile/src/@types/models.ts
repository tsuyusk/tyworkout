export interface Workout {
  id: string;
  done: boolean;
  title: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: string;
  title: string;
  done: boolean;
  goalReps: number;
  goalSets: number;
}
