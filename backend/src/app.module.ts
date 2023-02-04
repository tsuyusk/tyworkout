import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { WorkoutModule } from './workout/workout.module';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [ScheduleModule.forRoot(), UsersModule, WorkoutModule],
  controllers: [],
  providers: [TasksService],
})
export class AppModule {}
