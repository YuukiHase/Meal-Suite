import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { BackendService } from "src/app/backend.service";
import { DisplayTask } from "src/app/interfaces/task";
import { User } from "src/app/interfaces/user";
import { TaskStatusPipe } from "src/app/pipes/task-status.pipe";
import { ApiService } from "src/app/services/api.service";
import { ListTaskComponent } from "./list-task.component";

describe("ListTaskComponent", () => {
	let component: ListTaskComponent;
	let fixture: ComponentFixture<ListTaskComponent>;
	const mockUsers: User[] = [
		{ id: 1, name: "Tommy" },
		{ id: 2, name: "James" },
	];
	const mockTasks: DisplayTask[] = [
		{
			id: 0,
			description: "Task Mock 01",
			user: mockUsers[0],
			completed: false,
		},
		{
			id: 1,
			description: "Task Mock 02",
			user: mockUsers[1],
			completed: false,
		},
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ListTaskComponent, TaskStatusPipe],
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				BrowserAnimationsModule,
				MatButtonModule,
				MatInputModule,
				MatProgressBarModule,
			],
			providers: [ApiService, BackendService, FormBuilder],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ListTaskComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	describe("onRowSelected", () => {
		it("should call navigate method to navigate to /detail/:taskId", () => {
			spyOn(component["router"], "navigate");
			const taskId = 1;
			component.onRowSelected(taskId);
			expect(component["router"].navigate).toHaveBeenCalledWith([
				"/detail",
				taskId,
			]);
		});
	});

	describe("onAddNewTask", () => {
		it("should call navigate method to navigate to detail page", () => {
			spyOn(component["router"], "navigate");
			component.onAddNewTask();
			expect(component["router"].navigate).toHaveBeenCalledWith(["/detail"]);
		});
	});

	describe("onTaskCompleted", () => {
		it("should update completed property of task to true", () => {
			component.tasks$.next(mockTasks);
			const mockTask: DisplayTask = mockTasks[0];
			spyOn(component["apiService"], "completeTask");
			(component["apiService"].completeTask as jasmine.Spy).and.returnValue(
				of(mockTask)
			);
			component.onTaskCompleted(mockTask.id);
			expect(component["apiService"].completeTask).toHaveBeenCalledWith(
				mockTask.id
			);
			expect(component.tasks$.getValue()[0].completed).toBeTruthy();
		});
	});

	it("should render table of tasks when tasks are fetched from ApiService", () => {
		const listTaskComponentElement = fixture.nativeElement as HTMLElement;
		spyOn(component["apiService"], "getUsers").and.returnValue(of(mockUsers));
		spyOn(component["apiService"], "getTasks").and.returnValue(of(mockTasks));

		expect(component.tasks$.getValue().length).toBe(0);
		expect(listTaskComponentElement.querySelector("table")).toBeNull();

		component.ngOnInit();
		fixture.detectChanges();

		expect(component.tasks$.getValue().length).toBe(mockTasks.length);
		expect(listTaskComponentElement.querySelector("table")).toBeTruthy();
	});
});
