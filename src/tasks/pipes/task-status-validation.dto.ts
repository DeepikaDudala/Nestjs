import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidation implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: any) {
    value = value.toUpperCase();
    if (this.allowedStatus.indexOf(value) === -1)
      throw new BadRequestException(`"${value}" is invalid status`);
    return value;
  }
}
