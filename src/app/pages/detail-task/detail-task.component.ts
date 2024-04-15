import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, combineLatest } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { Task, User } from "src/app/backend.service";
import { TaskStatus } from "src/app/constants/task.constant";
import { UserType } from "src/app/constants/user.constant";
import { ApiService } from "src/app/services/api.service";

@Component({
	selector: "app-detail-task",
	templateUrl: "./detail-task.component.html",
	styleUrls: ["./detail-task.component.css"],
})
export class DetailTaskComponent implements OnInit, OnDestroy {
	private readonly destroy$ = new Subject<void>();
	public task: Task;
	public users: User[] = [];
	public loading: boolean = false;
	public isUpdate: boolean = false;
	public taskForm = this.fb.group({
		description: ["", [Validators.required]],
		assigneeId: [""],
		completed: [false],
	});
	public TaskStatus = TaskStatus;
	public UserType = UserType;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private apiService: ApiService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		const taskId = this.route.snapshot.paramMap.get("taskId");
		const users$ = this.apiService.getUsers();
		const task$ = this.apiService.getTask(+taskId);
		this.isUpdate = taskId !== null;

		if (this.isUpdate) {
			this.loading = true;

			combineLatest([users$, task$])
				.pipe(takeUntil(this.destroy$))
				.subscribe(([users, task]) => {
					this.users = users;

					if (users && task) {
						this.task = task;
						this.taskForm.patchValue({
							description: task.description,
							assigneeId: task.assigneeId ? task.assigneeId : "",
							completed: task.completed,
						});
						this.loading = false;
					} else {
						this.router.navigate(["/detail"]);
					}
				});
		} else {
			this.taskForm.patchValue({
				assigneeId: "",
			});
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next();
	}

	onBack(): void {
		this.router.navigate(["/task"]);
	}

	onUpdate(): void {
		if (this.isUpdate) {
			this.loading = true;
			const { description, assigneeId, completed } = this.taskForm.value;
			this.apiService
				.updateTask(this.task.id, {
					description,
					assigneeId: assigneeId ? +assigneeId : null,
					completed: completed,
				})
				.pipe(take(1))
				.subscribe(() => (this.loading = false));
		}
	}

	onCreate(): void {
		if (!this.isUpdate) {
			this.loading = true;
			const { description } = this.taskForm.value;
			this.apiService
				.createTask(description)
				.pipe(take(1))
				.subscribe((newTask) => {
					this.router.navigate(["/detail", newTask.id]);
					this.loading = false;
				});
		}
	}
}
