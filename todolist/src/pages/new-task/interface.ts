export enum CREATE_TASK {
  TASK_NAME = "TASK_NAME",
  GROUP_TASK = "GROUP_TASK",
}

export interface TaskNew {
  title: string;
  taskType: string;
  groupTask: boolean;
  member?: number[];
  status: string;
  createBy: number;
  createAt: number;
  updateAt: number;
}
