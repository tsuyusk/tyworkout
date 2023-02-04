import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WorkoutService } from 'src/workout/workout.service';

@Injectable()
export class TasksService {
  constructor(private workoutService: WorkoutService) {
    this.handleSchedule();
  }
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleSchedule() {
    this.logger.debug('Create tasks');

    return await this.workoutService.createDailyWorkout();
  }
}
