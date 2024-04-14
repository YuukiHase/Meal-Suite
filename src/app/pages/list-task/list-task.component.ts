import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, combineLatest } from "rxjs";
import {
	debounceTime,
	distinctUntilChanged,
	take,
	takeUntil,
} from "rxjs/operators";
import { Task } from "src/app/backend.service";
import { User } from "src/app/interfaces/user";
import { ApiService } from "src/app/services/api.service";
import { ListTaskService } from "src/app/services/list-task.service";

@Component({
	selector: "app-list-task",
	templateUrl: "./list-task.component.html",
	styleUrls: ["./list-task.component.css"],
})
export class ListTaskComponent implements OnInit, OnDestroy {
	private readonly destroy$ = new Subject<void>();
	public users: User[] = [];
	public tasks: Task[] = [];
	public filteredTasks: Task[] = [];
	public displayColumn: string[] = [
		"Task ID",
		"Description",
		"Assignee",
		"Status",
		"Action",
	];
	public searchForm: FormGroup = this.fb.group({
		search: [""],
	});
	public loading: boolean = false;

	constructor(
		private apiService: ApiService,
		private router: Router,
		private fb: FormBuilder,
		private listTaskService: ListTaskService
	) {}

	ngOnInit(): void {
		this.loading = true;

		combineLatest([this.apiService.getUsers(), this.apiService.getTasks()])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([users, tasks]) => {
				this.users = users;
				this.tasks = tasks;
				this.filteredTasks = tasks;
				this.loading = false;
			});

		const searchControl = this.searchForm.get("search") as FormControl;
		searchControl.valueChanges
			.pipe(
				debounceTime(1000),
				distinctUntilChanged(),
				takeUntil(this.destroy$)
			)
			.subscribe((searchValue) => {
				if (searchValue.trim()) {
					this.filteredTasks = this.listTaskService.filterTasks(
						this.tasks,
						this.users,
						searchValue.trim()
					);
				} else {
					this.filteredTasks = this.tasks;
				}
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
