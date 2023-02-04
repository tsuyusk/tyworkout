import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [WorkoutController],
  providers: [PrismaService, WorkoutService],
  exports: [WorkoutService],
})
export class WorkoutModule {}
