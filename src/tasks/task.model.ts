export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
// type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
