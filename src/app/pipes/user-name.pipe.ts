import { Pipe, PipeTransform } from "@angular/core";
import { User } from "../interfaces/user";

@Pipe({
	name: "userName",
})
export class UserNamePipe implements PipeTransform {
	transform(userId: number, listUser: User[]): string {
		const index = listUser.findIndex((user) => user.id === userId);
		return index !== -1 ? listUser[index].name : `Anonymous`;
	}
}
