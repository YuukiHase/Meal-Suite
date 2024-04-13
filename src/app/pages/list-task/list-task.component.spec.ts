import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BackendService } from "src/app/backend.service";
import { ApiService } from "src/app/services/api.service";
import { ListTaskComponent } from "./list-task.component";

describe("ListTaskComponent", () => {
	let component: ListTaskComponent;
	let fixture: ComponentFixture<ListTaskComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ListTaskComponent],
			imports: [RouterTestingModule],
			providers: [ApiService, BackendService],
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
});
