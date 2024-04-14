import { Injectable } from "@angular/core";
import { DisplayTask } from "../interfaces/task";
import { TaskStatusPipe } from "../pipes/task-status.pipe";

@Injectable({
	providedIn: "root",
})
export class ListTaskService {
	constructor() {}

	filterTasks(tasks: DisplayTask[], searchString: string): DisplayTask[] {
		if (searchString.trim() === null || searchString.trim() === "") {
			return tasks;
		}

		const taskStatusPipe = new TaskStatusPipe();
		const mappedTask = tasks.map((task) => ({
			id: task.id,
			description: task.description,
			userName: task.user ? task.user.name : "Anonymous",
			completed: taskStatusPipe.transform(task.completed),
		}));

		const filteredTask: DisplayTask[] = [];

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
