import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, combineLatest } from "rxjs";
import {
	debounceTime,
	distinctUntilChanged,
	map,
	startWith,
	take,
	takeUntil,
} from "rxjs/operators";
import { DisplayTask } from "src/app/interfaces/task";
import { ApiService } from "src/app/services/api.service";
import { ListTaskService } from "src/app/services/list-task.service";

@Component({
	selector: "app-list-task",
	templateUrl: "./list-task.component.html",
	styleUrls: ["./list-task.component.css"],
})
export class ListTaskComponent implements OnInit, OnDestroy {
	private readonly destroy$ = new Subject<void>();
	public tasks$: BehaviorSubject<DisplayTask[]> = new BehaviorSubject([]);
	public filteredTasks$: Observable<DisplayTask[]>;
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
				const displayTasks = tasks.map((task) => ({
					id: task.id,
					description: task.description,
					user: users.find((user) => user.id === task.assigneeId),
					completed: task.completed,
				}));
				this.tasks$.next(displayTasks);
				this.loading = false;
			});

		const searchControl = this.searchForm.get("search") as FormControl;
		const searchControlChange$ = searchControl.valueChanges.pipe(
			debounceTime(1000),
			startWith(""),
			distinctUntilChanged()
		);

		this.filteredTasks$ = combineLatest([
			this.tasks$,
			searchControlChange$,
		]).pipe(
			map(([tasks, searchValue]) =>
				this.listTaskService.filterTasks(tasks, searchValue)
			)
		);
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
				}
			});
	}

	onRowSelected(taskId: number): void {
		this.router.navigate(["/detail", taskId]);
	}
}
