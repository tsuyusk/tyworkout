import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { endOfToday } from 'date-fns';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private prismaService: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto, user: User) {
    const { occourenceDays, title } = createWorkoutDto;

    const workoutPlan = await this.prismaService.workoutPlan.create({
      data: {
        occourenceDays,
        title,
        userId: user.id,
      },
    });

    return workoutPlan;
  }

  async createDailyWorkout() {
    // TODO: Consider specific days for creating workout
    const workoutPlans = await this.prismaService.workoutPlan.findMany();

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
    });

    return workouts;
  }

  async setWorkoutAsDone(id: string, user: User) {
    const workout = await this.prismaService.workout.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!workout) {
      throw new HttpException("Couldn't find this workout plan", 400);
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
}
