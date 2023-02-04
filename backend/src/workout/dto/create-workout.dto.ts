import { IsBoolean, IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  occourenceDays: string;

  @IsString()
  title: string;
}
