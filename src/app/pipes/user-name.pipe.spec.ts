import { User } from "../interfaces/user";
import { UserNamePipe } from "./user-name.pipe";

describe("UserNamePipe", () => {
	const pipe = new UserNamePipe();
	const mockListUser: User[] = [
		{ id: 11, name: "Mike" },
		{ id: 22, name: "James" },
	];

	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});

	it('transforms to "Anonymous" if userId is not contained in listUser', () => {
		expect(pipe.transform(1, mockListUser)).toEqual("Anonymous");
	});

	it("transforms userId to userName if userId is contained in listUser", () => {
		mockListUser.forEach((mockUser) => {
			expect(pipe.transform(mockUser.id, mockListUser)).toEqual(mockUser.name);
		});
	});
});
