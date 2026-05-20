import { stylesheetService } from "../services/stylesheet.service.js";
export async function saveSchema(request, response) {
    const { name, cssContent, urlPatterns } = request.body;
    const userId = request.user.userId;
    const schema = await stylesheetService.saveSchema(userId, name ?? "", cssContent ?? "", urlPatterns ?? []);
    response.status(201).json(schema);
}
export async function getSchema(request, response) {
    const userId = request.user.userId;
    const name = String(request.params.name);
    const schema = await stylesheetService.getSchema(userId, name);
    response.status(200).json(schema);
}
export async function listSchemasByUser(request, response) {
    const userId = request.user.userId;
    const schemas = await stylesheetService.listByUser(userId);
    response.status(200).json(schemas);
}
export async function updateSchema(request, response) {
    const stylesheetId = Number(request.params.id);
    const { name, cssContent, isActive, urlPatterns } = request.body;
    const schema = await stylesheetService.updateSchema(stylesheetId, {
        ...(name !== undefined ? { name } : {}),
        ...(cssContent !== undefined ? { cssContent } : {}),
        ...(isActive !== undefined ? { isActive } : {}),
        ...(urlPatterns !== undefined ? { urlPatterns } : {}),
    });
    response.status(200).json(schema);
}
export async function deleteSchema(request, response) {
    const stylesheetId = Number(request.params.id);
    const userId = request.user.userId;
    await stylesheetService.deleteSchema(stylesheetId, userId);
    response.status(200).json({ message: "Schema deleted successfully" });
}
//# sourceMappingURL=stylesheet.controller.js.map