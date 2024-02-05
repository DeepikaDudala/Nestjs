import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidation } from './pipes/task-status-validation.dto';
import { IsEnum } from 'class-validator';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) getTaskFilterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(getTaskFilterDto).length)
      return this.tasksService.getTasksWithFilter(getTaskFilterDto);

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStaus(id, status);
  }
}
