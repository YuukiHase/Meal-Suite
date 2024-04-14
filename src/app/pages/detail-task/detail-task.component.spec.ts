import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { BackendService } from "src/app/backend.service";
import { ApiService } from "src/app/services/api.service";
import { DetailTaskComponent } from "./detail-task.component";

describe("DetailTaskComponent", () => {
	let component: DetailTaskComponent;
	let fixture: ComponentFixture<DetailTaskComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DetailTaskComponent],
			imports: [
				RouterTestingModule,
				BrowserAnimationsModule,
				MatButtonModule,
				MatInputModule,
				MatProgressBarModule,
				MatCardModule,
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
});
