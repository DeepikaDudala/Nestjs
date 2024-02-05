import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTaskFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
