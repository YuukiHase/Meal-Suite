import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BackendService } from "../backend.service";
import { Task, TaskInput } from "../interfaces/task";
import { User } from "../interfaces/user";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(private backendService: BackendService) {}

	getUsers(): Observable<User[]> {
		return this.backendService.users();
	}

	getTasks(): Observable<Task[]> {
		return this.backendService.tasks();
	}

	completeTask(taskId: number): Observable<Task> {
		return this.backendService.complete(taskId, true);
	}

	updateTask(taskId: number, taskInput: TaskInput): Observable<Task> {
		return this.backendService.update(taskId, taskInput);
	}

	createTask(description: string): Observable<Task> {
		return this.backendService.newTask({ description });
	}
}
