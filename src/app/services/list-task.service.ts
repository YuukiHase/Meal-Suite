import { Injectable } from "@angular/core";
import { Task } from "../interfaces/task";
import { User } from "../interfaces/user";
import { TaskStatusPipe } from "../pipes/task-status.pipe";
import { UserNamePipe } from "../pipes/user-name.pipe";

@Injectable({
	providedIn: "root",
})
export class ListTaskService {
	constructor() {}

	filterTasks(tasks: Task[], users: User[], searchString: string): Task[] {
		const userNamePipe = new UserNamePipe();
		const taskStatusPipe = new TaskStatusPipe();
		const mappedTask = tasks.map((task) => ({
			...task,
			assigneeId: userNamePipe.transform(+task.assigneeId, users),
			completed: taskStatusPipe.transform(task.completed),
		}));

		const filteredTask: Task[] = [];

		mappedTask.filter((obj, index) =>
			Object.values(obj).some((value) => {
				if (`${value}`.toLowerCase().includes(searchString.toLowerCase())) {
					filteredTask.push(tasks[index]);
					return true;
				}
			})
		);

		return filteredTask;
	}
}
