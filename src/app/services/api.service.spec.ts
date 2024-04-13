import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { BackendService } from "../backend.service";
import { Task, TaskInput } from "../interfaces/task";
import { User } from "../interfaces/user";
import { ApiService } from "./api.service";

fdescribe("ApiService", () => {
	let service: ApiService;
	let backendServiceSpy: jasmine.SpyObj<BackendService>;

	beforeEach(() => {
		const spy = jasmine.createSpyObj("BackendService", [
			"users",
			"tasks",
			"task",
			"complete",
			"update",
			"newTask",
		]);
		TestBed.configureTestingModule({
			providers: [{ provide: BackendService, useValue: spy }],
		});
		service = TestBed.inject(ApiService);
		backendServiceSpy = TestBed.inject(
			BackendService
		) as jasmine.SpyObj<BackendService>;
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getUsers", () => {
		it("should return list of user", (done: DoneFn) => {
			const expectedUsers: User[] = [
				{ id: 1, name: "Tommy" },
				{ id: 2, name: "James" },
			];
			backendServiceSpy.users.and.returnValue(of(expectedUsers));
			service.getUsers().subscribe((users) => {
				users.forEach((user, index) => {
					expect(user.id).toEqual(expectedUsers[index].id);
					expect(user.name).toEqual(expectedUsers[index].name);
				});
				done();
			});
		});
	});

	describe("getTasks", () => {
		it("should return list of task", (done: DoneFn) => {
			const expectedTasks: Task[] = [
				{
					id: 0,
					description: "Task Mock 01",
					assigneeId: 1,
					completed: false,
				},
				{
					id: 1,
					description: "Task Mock 02",
					assigneeId: 2,
					completed: false,
				},
			];
			backendServiceSpy.tasks.and.returnValue(of(expectedTasks));
			service.getTasks().subscribe((tasks) => {
				tasks.forEach((task, index) => {
					expect(task.id).toEqual(expectedTasks[index].id);
					expect(task.description).toEqual(expectedTasks[index].description);
					expect(task.assigneeId).toBe(expectedTasks[index].assigneeId);
					expect(task.completed).toBe(expectedTasks[index].completed);
				});
				done();
			});
		});
	});

	describe("getTask", () => {
		it("should return a task match with taskId", (done: DoneFn) => {
			const expectedTask: Task = {
				id: 0,
				description: "Task Mock 01",
				assigneeId: 1,
				completed: false,
			};
			backendServiceSpy.task.and.returnValue(of(expectedTask));
			service.getTask(expectedTask.id).subscribe((task) => {
				expect(task.id).toEqual(expectedTask.id);
				expect(task.description).toEqual(expectedTask.description);
				expect(task.assigneeId).toBe(expectedTask.assigneeId);
				expect(task.completed).toBe(expectedTask.completed);
				done();
			});
			expect(backendServiceSpy.task).toHaveBeenCalledWith(expectedTask.id);
		});
	});

	describe("completeTask", () => {
		it("should return a task which is completed", (done: DoneFn) => {
			const expectedTask: Task = {
				id: 0,
				description: "Task Mock 01",
				assigneeId: 1,
				completed: true,
			};
			backendServiceSpy.complete.and.returnValue(of(expectedTask));
			service.completeTask(expectedTask.id).subscribe((task) => {
				expect(task.id).toEqual(expectedTask.id);
				expect(task.description).toEqual(expectedTask.description);
				expect(task.assigneeId).toBe(expectedTask.assigneeId);
				expect(task.completed).toBe(expectedTask.completed);
				done();
			});
			expect(backendServiceSpy.complete).toHaveBeenCalledWith(
				expectedTask.id,
				true
			);
		});
	});

	describe("updateTask", () => {
		it("should return a task which is updated", (done: DoneFn) => {
			const expectedTask: Task = {
				id: 0,
				description: "Task Mock 01",
				assigneeId: 1,
				completed: true,
			};
			backendServiceSpy.update.and.returnValue(of(expectedTask));
			const taskInput: TaskInput = {
				description: expectedTask.description,
				assigneeId: expectedTask.assigneeId,
				completed: expectedTask.completed,
			};
			service.updateTask(expectedTask.id, taskInput).subscribe((task) => {
				expect(task.id).toEqual(expectedTask.id);
				expect(task.description).toEqual(expectedTask.description);
				expect(task.assigneeId).toBe(expectedTask.assigneeId);
				expect(task.completed).toBe(expectedTask.completed);
				done();
			});
			expect(backendServiceSpy.update).toHaveBeenCalledWith(
				expectedTask.id,
				taskInput
			);
		});
	});

	describe("createTask", () => {
		it("should return a task which is created", (done: DoneFn) => {
			const expectedTask: Task = {
				id: 0,
				description: "Task Mock 01",
				assigneeId: 1,
				completed: true,
			};
			backendServiceSpy.newTask.and.returnValue(of(expectedTask));
			service.createTask(expectedTask.description).subscribe((task) => {
				expect(task.id).toEqual(expectedTask.id);
				expect(task.description).toEqual(expectedTask.description);
				expect(task.assigneeId).toBe(expectedTask.assigneeId);
				expect(task.completed).toBe(expectedTask.completed);
				done();
			});
			expect(backendServiceSpy.newTask).toHaveBeenCalledWith({
				description: expectedTask.description,
			});
		});
	});
});
