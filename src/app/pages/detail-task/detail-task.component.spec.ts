import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { BackendService } from "src/app/backend.service";
import { Task } from "src/app/interfaces/task";
import { User } from "src/app/interfaces/user";
import { ApiService } from "src/app/services/api.service";
import { DetailTaskComponent } from "./detail-task.component";

describe("DetailTaskComponent", () => {
	let component: DetailTaskComponent;
	let fixture: ComponentFixture<DetailTaskComponent>;
	const mockUsers: User[] = [
		{ id: 1, name: "Tommy" },
		{ id: 2, name: "James" },
	];
	const mockTask: Task = {
		id: 0,
		description: "Task Mock 01",
		assigneeId: 11,
		completed: false,
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DetailTaskComponent],
			imports: [
				RouterTestingModule,
				BrowserAnimationsModule,
				ReactiveFormsModule,
				MatButtonModule,
				MatInputModule,
				MatProgressBarModule,
				MatCardModule,
				MatRadioModule,
				MatSelectModule,
			],
			providers: [ApiService, BackendService, FormBuilder],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DetailTaskComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should navigate to Create page when users or task is null", () => {
		spyOn(component["route"].snapshot.paramMap, "get").and.returnValue(1);
		spyOn(component["apiService"], "getUsers").and.returnValue(of(null));
		spyOn(component["apiService"], "getTask").and.returnValue(of(null));
		spyOn(component["router"], "navigate");

		component.ngOnInit();
		fixture.detectChanges();

		const htmlElement = fixture.nativeElement as HTMLElement;
		const createLabelElement = htmlElement.querySelector(
			"mat-card-subtitle"
		) as HTMLElement;

		expect(component["router"].navigate).toHaveBeenCalledWith(["/detail"]);
		expect(createLabelElement.innerHTML).toEqual("Create");
	});

	it("should navigate to Create page when taskId is not existed in URL", () => {
		spyOn(component["route"].snapshot.paramMap, "get").and.returnValue(null);
		spyOn(component["apiService"], "getUsers").and.returnValue(of(mockUsers));
		spyOn(component["apiService"], "getTask").and.returnValue(of(mockTask));
		spyOn(component["router"], "navigate");
		spyOn(component["taskForm"], "patchValue");

		component.ngOnInit();
		fixture.detectChanges();

		const htmlElement = fixture.nativeElement as HTMLElement;
		const createLabelElement = htmlElement.querySelector(
			"mat-card-subtitle"
		) as HTMLElement;

		expect(component["router"].navigate).not.toHaveBeenCalled();
		expect(component["taskForm"].patchValue).toHaveBeenCalledWith({
			assigneeId: "",
		});
		expect(createLabelElement.innerHTML).toEqual("Create");
	});

	it("should navigate to Edit page when taskId is existed in Backend", () => {
		spyOn(component["route"].snapshot.paramMap, "get").and.returnValue(1);
		spyOn(component["apiService"], "getUsers").and.returnValue(of(mockUsers));
		spyOn(component["apiService"], "getTask").and.returnValue(of(mockTask));
		spyOn(component["router"], "navigate");
		spyOn(component["taskForm"], "patchValue");

		component.ngOnInit();
		fixture.detectChanges();

		const htmlElement = fixture.nativeElement as HTMLElement;
		const editLabelElement = htmlElement.querySelector(
			"mat-card-subtitle"
		) as HTMLElement;

		expect(component["router"].navigate).not.toHaveBeenCalled();
		expect(component["taskForm"].patchValue).toHaveBeenCalledWith({
			description: mockTask.description,
			assigneeId: mockTask.assigneeId,
			completed: mockTask.completed,
		});
		expect(editLabelElement.innerHTML).toEqual("Edit");
	});
});
