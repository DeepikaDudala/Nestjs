import { Body, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks = [];

  getAllTasks() {
    return this.tasks;
  }
  getTaskById(@Body('id') id: string) {
    return this.tasks.map((task) => task.id === id);
  }
  createTask(createTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
