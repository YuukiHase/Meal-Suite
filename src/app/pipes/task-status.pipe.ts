import { Pipe, PipeTransform } from "@angular/core";
import { TaskStatus } from "../constants/task.constant";

@Pipe({
	name: "taskStatus",
})
export class TaskStatusPipe implements PipeTransform {
	transform(status: boolean): string {
		return status ? TaskStatus.Completed : TaskStatus.Inprogress;
	}
}
