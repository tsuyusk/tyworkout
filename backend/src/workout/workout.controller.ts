import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  Request,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto, @Request() req) {
    return this.workoutService.create(createWorkoutDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/today')
  getForToday(@Request() req) {
    return this.workoutService.findAllForToday(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id') id: string, @Request() req) {
    return this.workoutService.delete(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/done')
  setWorkoutAsDone(@Param('id') id: string, @Request() req) {
    return this.workoutService.setWorkoutAsDone(id, req.user);
  }
}
