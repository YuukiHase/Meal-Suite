export interface Task {
	id: number;
	description: string;
	assigneeId: number;
	completed: boolean;
}

export interface TaskInput {
	description: string;
	assigneeId: number;
	completed: boolean;
}
