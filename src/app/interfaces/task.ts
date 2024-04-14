import { User } from "./user";

export interface Task {
	id: number;
	description: string;
	assigneeId: number;
	completed: boolean;
}

export interface DisplayTask {
	id: number;
	description: string;
	user?: User;
	completed: boolean;
}

export interface TaskInput {
	description: string;
	assigneeId: number;
	completed: boolean;
}
