import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, combineLatest } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { Task } from "src/app/backend.service";
import { User } from "src/app/interfaces/user";
import { ApiService } from "src/app/services/api.service";

@Component({
	selector: "app-list-task",
	templateUrl: "./list-task.component.html",
	styleUrls: ["./list-task.component.css"],
})
export class ListTaskComponent implements OnInit, OnDestroy {
	private readonly destroy$ = new Subject<void>();
	public users: User[] = [];
	public tasks: Task[] = [];
	public displayColumn: string[] = [
		"Task ID",
		"Description",
		"Assignee",
		"Status",
		"Action",
	];

	constructor(private apiService: ApiService, private router: Router) {}

	ngOnInit(): void {
		combineLatest([this.apiService.getUsers(), this.apiService.getTasks()])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([users, tasks]) => {
				this.users = users;
				this.tasks = tasks;
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
	}

	onAddNewTask(): void {
		this.router.navigate(["/detail"]);
	}

	onTaskCompleted(taskId: number): void {
		this.apiService
			.completeTask(taskId)
			.pipe(take(1))
			.subscribe((res) => {
				if (res) {
					this.tasks.find((task) => {
						if (task.id === taskId) {
							task.completed = true;
							return true;
						}
					});
				}
			});
	}

	onRowSelected(taskId: number): void {
		this.router.navigate(["/detail", taskId]);
	}
}
