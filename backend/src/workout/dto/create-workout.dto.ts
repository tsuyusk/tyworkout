import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  ValidateNested,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  title: string;

  @IsInt()
  goalReps: number;

  @IsInt()
  goalSets: number;
}

export class CreateWorkoutDto {
  @IsString()
  occourenceDays: string;

  @IsString()
  title: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];
}
