import { Injectable } from "@angular/core";
import { BackendService } from "../backend.service";
import { Observable } from "rxjs";
import { User } from "../interfaces/user";
import { Task, TaskInput } from "../interfaces/task";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(private backendService: BackendService) {}

	getUsers(): Observable<User[]> {
		return this.backendService.users();
	}

	updateTask(taskId: number, taskInput: TaskInput): Observable<Task> {
		return this.backendService.update(taskId, taskInput);
	}

	createTask(description: string): Observable<Task> {
		return this.backendService.newTask({ description });
	}
}
