import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { BackendService, Task, User } from "src/app/backend.service";
import { TaskStatus } from "src/app/constants/task.constant";
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
	public taskForm = this.fb.group({
		description: [""],
		assigneeId: [""],
		completed: [TaskStatus.Completed],
	});
	public TaskStatus = TaskStatus;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private backend: BackendService,
		private apiService: ApiService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.loading = true;

		// Get all user for Assignee selection.
		this.apiService
			.getUsers()
			.pipe(takeUntil(this.destroy$))
			.subscribe((users) => {
				this.users = users;

				const taskId = this.route.snapshot.paramMap.get("taskId");
				if (taskId) {
					// If taskId is existed. We create an update page.
					this.backend
						.task(+taskId)
						.pipe(takeUntil(this.destroy$))
						.subscribe((task) => {
							if (task) {
								this.task = task;
								this.taskForm.patchValue({
									description: task.description,
									assigneeId: task.assigneeId ? task.assigneeId : "",
									completed: task.completed
										? TaskStatus.Completed
										: TaskStatus.Inprogress,
								});
								this.loading = false;
							} else {
								this.router.navigate(["/detail"]);
							}
						});
				} else {
					// Else. We create a create page.
					this.taskForm.patchValue({
						assigneeId: users[0].id,
					});
					this.loading = false;
				}
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
	}

	onBack(): void {
		this.router.navigate(["/task"]);
	}

	onUpdate(): void {
		if (this.task) {
			this.loading = true;
			const { description, assigneeId, completed } = this.taskForm.value;
			this.apiService
				.updateTask(this.task.id, {
					description,
					assigneeId: assigneeId ? +assigneeId : null,
					completed: completed === TaskStatus.Completed,
				})
				.pipe(take(1))
				.subscribe((task) => (this.loading = false));
		}
	}

	onCreate(): void {
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
