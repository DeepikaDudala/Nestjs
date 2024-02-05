import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from './task.model';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilter(getTaskFilterDto: GetTaskFilterDto) {
    const { search, status } = getTaskFilterDto;
    if (search)
      this.tasks = this.tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    else if (status)
      this.tasks = this.tasks.filter((task) => task.status.includes(status));
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) throw new NotFoundException(`Task does not exists`);
    return task;
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

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    if (!found) throw new NotFoundException(`Task does not exists`);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTaskStaus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    if (!task) throw new NotFoundException(`Task not found`);
    task.status = status;
    return task;
  }
}
