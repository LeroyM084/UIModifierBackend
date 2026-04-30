import { userService } from "../services/user.service.js";
export async function registerUser(request, response) {
    const { username, email, password } = request.body;
    const user = await userService.register(username ?? "", email ?? "", password ?? "");
    response.status(201).json(user);
}
export async function loginUser(request, response) {
    const { email, password } = request.body;
    const user = await userService.login(email ?? "", password ?? "");
    response.status(200).json(user);
}
//# sourceMappingURL=user.controller.js.map