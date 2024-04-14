import { TestBed } from "@angular/core/testing";
import { Task } from "../interfaces/task";
import { User } from "../interfaces/user";
import { ListTaskService } from "./list-task.service";

describe("ListTaskService", () => {
	let service: ListTaskService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ListTaskService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("filterTasks", () => {
		it("should return a list of filtered task", () => {
			const mockUsers: User[] = [
				{ id: 11, name: "Mike" },
				{ id: 22, name: "James" },
			];
			const mockTasks: Task[] = [
				{
					id: 0,
					description: "Install a monitor arm",
					assigneeId: mockUsers[0].id,
					completed: false,
				},
				{
					id: 1,
					description: "Move the desk to the new location",
					assigneeId: mockUsers[1].id,
					completed: true,
				},
			];

			const filteredTask = service.filterTasks(
				mockTasks,
				mockUsers,
				"Move the desk"
			);
			expect(filteredTask.length).toEqual(1);
			expect(filteredTask[0].id).toEqual(mockTasks[1].id);
			expect(filteredTask[0].description).toEqual(mockTasks[1].description);
			expect(filteredTask[0].assigneeId).toEqual(mockTasks[1].assigneeId);
			expect(filteredTask[0].completed).toBe(mockTasks[1].completed);
		});
	});
});
