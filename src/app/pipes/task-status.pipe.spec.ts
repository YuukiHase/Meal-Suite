import { TaskStatus } from "../constants/task.constant";
import { TaskStatusPipe } from "./task-status.pipe";

describe("TaskStatusPipe", () => {
	const pipe = new TaskStatusPipe();

	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});

	it('transforms "true" to "Completed"', () => {
		expect(pipe.transform(true)).toEqual(TaskStatus.Completed);
	});
	it('transforms "false" to "In progress"', () => {
		expect(pipe.transform(false)).toEqual(TaskStatus.Inprogress);
	});
});
