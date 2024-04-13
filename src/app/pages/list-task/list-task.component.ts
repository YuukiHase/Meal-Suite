import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BackendService, Task, User } from "src/app/backend.service";

@Component({
	selector: "app-list-task",
	templateUrl: "./list-task.component.html",
	styleUrls: ["./list-task.component.css"],
})
export class ListTaskComponent implements OnInit, OnDestroy {
	private readonly destroy$ = new Subject<void>();
	public tasks: Task[] = [];

	constructor(private backend: BackendService) {}

	ngOnInit(): void {
		this.backend
			.tasks()
			.pipe(takeUntil(this.destroy$))
			.subscribe((tasks) => {
				this.tasks = tasks;
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
	}
}
