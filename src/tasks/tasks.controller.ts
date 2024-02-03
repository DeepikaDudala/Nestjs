import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }
  @Get()
  getTaskById(id: string) {
    return this.tasksService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
}
