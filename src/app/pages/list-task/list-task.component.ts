import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, combineLatest } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { UserType } from "src/app/constants/user.constant";
import { DisplayTask } from "src/app/interfaces/task";
import { TaskStatusPipe } from "src/app/pipes/task-status.pipe";
import { ApiService } from "src/app/services/api.service";

@Component({
	selector: "app-list-task",
	templateUrl: "./list-task.component.html",
	styleUrls: ["./list-task.component.css"],
})
export class ListTaskComponent implements OnInit, OnDestroy {
	private readonly destroy$ = new Subject<void>();
	public tasks$: BehaviorSubject<DisplayTask[]> = new BehaviorSubject([]);
	public displayedColumns: string[] = [
		"taskId",
		"description",
		"assignee",
		"status",
		"action",
	];
	public dataSource: MatTableDataSource<DisplayTask> = new MatTableDataSource();
	public loading: boolean = false;
	public UserType = UserType;

	constructor(private apiService: ApiService, private router: Router) {}

	ngOnInit(): void {
		this.loading = true;

		combineLatest([this.apiService.getUsers(), this.apiService.getTasks()])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([users, tasks]) => {
				const displayTasks = tasks.map((task) => ({
					id: task.id,
					description: task.description,
					user: users.find((user) => user.id === task.assigneeId),
					completed: task.completed,
				}));
				this.tasks$.next(displayTasks);
				this.dataSource.data = displayTasks;
				this.loading = false;
			});

		this.dataSource.filterPredicate = function (
			task: DisplayTask,
			filter: string
		): boolean {
			const taskStatusPipe = new TaskStatusPipe();
			const mappedTask = {
				id: task.id,
				description: task.description,
				userName: task.user ? task.user.name : UserType.Anonymous,
				completed: taskStatusPipe.transform(task.completed),
			};
			return Object.values(mappedTask).some((value) => {
				if (`${value}`.toLowerCase().includes(filter.toLowerCase())) {
					return true;
				}
			});
		};
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
					const newTasks = this.tasks$
						.getValue()
						.map((task) =>
							task.id !== taskId ? task : { ...task, completed: true }
						);
					this.tasks$.next(newTasks);
					this.dataSource.data = newTasks;
				}
			});
	}

	onTaskSelected(taskId: number): void {
		this.router.navigate(["/detail", taskId]);
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
