import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { endOfToday } from 'date-fns';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private prismaService: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto, user: User) {
    const { occourenceDays, title, exercises } = createWorkoutDto;

    const workoutPlan = await this.prismaService.workoutPlan.create({
      data: {
        occourenceDays,
        title,
        userId: user.id,
        exercisePlans: {
          create: exercises.map((exercise) => ({
            title: exercise.title,
            userId: user.id,
            goalReps: exercise.goalReps,
            goalSets: exercise.goalSets,
          })),
        },
      },
      include: {
        exercisePlans: true,
      },
    });

    await this.createDailyWorkout();

    return workoutPlan;
  }

  async createDailyWorkout() {
    // TODO: Consider specific days for creating workout
    const workoutPlans = await this.prismaService.workoutPlan.findMany({
      include: {
        exercisePlans: true,
      },
    });

    workoutPlans.forEach(async (workoutPlan) => {
      const hasWorkoutForToday = await this.prismaService.workout.findFirst({
        where: {
          workoutPlanId: workoutPlan.id,
          expiresIn: endOfToday(),
        },
      });

      if (hasWorkoutForToday) return;

      await this.prismaService.workout.create({
        data: {
          userId: workoutPlan.userId,
          workoutPlanId: workoutPlan.id,
          done: false,
          expiresIn: endOfToday(),
          exercises: {
            create: workoutPlan.exercisePlans.map((exercisePlan) => ({
              title: exercisePlan.title,
              goalReps: exercisePlan.goalReps,
              goalSets: exercisePlan.goalSets,
              userId: workoutPlan.id,
            })),
          },
        },
      });
    });

    return { ok: true };
  }

  async findAllForToday(user: User) {
    const workouts = await this.prismaService.workout.findMany({
      where: {
        expiresIn: endOfToday(),
        userId: user.id,
      },
      include: {
        exercises: true,
      },
    });

    return workouts;
  }

  async setExerciseAsDone(id: string, user: User) {
    const workout = await this.prismaService.exercise.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!workout) {
      throw new HttpException("Couldn't find this exercise", 400);
    }

    return await this.prismaService.exercise.update({
      where: {
        id,
      },
      data: {
        done: true,
      },
    });
  }

  async setWorkoutAsDone(id: string, user: User) {
    const workout = await this.prismaService.workout.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!workout) {
      throw new HttpException("Couldn't find this workout", 400);
    }

    return await this.prismaService.workout.update({
      where: {
        id,
      },
      data: {
        done: !workout.done,
      },
    });
  }

  async delete(id: string, user: User) {
    const workoutPlan = await this.prismaService.workoutPlan.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!workoutPlan) {
      throw new HttpException("Couldn't find this workout plan", 400);
    }

    await this.prismaService.workoutPlan.delete({
      where: {
        id,
      },
    });

    return { ok: true };
  }

  async getWorkoutPlans(user: User) {
    const workoutPlans = await this.prismaService.workoutPlan.findMany({
      where: {
        userId: user.id,
      },
    });

    return workoutPlans;
  }
}
