import { TestBed } from "@angular/core/testing";

import { ApiService } from "./api.service";
import { BackendService } from "../backend.service";

describe("ApiService", () => {
	let service: ApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [BackendService] });
		service = TestBed.inject(ApiService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
