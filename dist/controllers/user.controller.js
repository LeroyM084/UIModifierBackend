import { userService } from "../services/user.service.js";
export async function registerUser(request, response) {
    const { username, email, password } = request.body;
    const user = await userService.register(username ?? "", email ?? "", password ?? "");
    response.status(201).json(user);
}
export async function loginUser(request, response) {
    const { email, password } = request.body;
    const result = await userService.login(email ?? "", password ?? "");
    response.status(200).json(result);
}
export async function refreshToken(request, response) {
    const { refreshToken } = request.body;
    if (!refreshToken) {
        return response.status(400).json({ error: "Refresh token is required" });
    }
    const result = await userService.refresh(refreshToken);
    response.status(200).json(result);
}
export async function logoutUser(request, response) {
    response.status(200).json({ message: "Logged out successfully" });
}
//# sourceMappingURL=user.controller.js.map