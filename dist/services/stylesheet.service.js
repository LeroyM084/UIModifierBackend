import { HttpError } from "../lib/http-error.js";
import { stylesheetRepository, targetRepository, userRepository } from "../repositories/index.js";
export const stylesheetService = {
    async saveSchema(userId, name, cssContent, urlPatterns = []) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        const stylesheet = await stylesheetRepository.create({
            userId,
            name,
            cssContent,
        });
        for (const urlPattern of urlPatterns) {
            await targetRepository.create({ stylesheetId: stylesheet.id, urlPattern });
        }
        return stylesheet;
    },
    async getSchema(userId, name) {
        const stylesheet = await stylesheetRepository.findByUserIdAndName(userId, name);
        if (!stylesheet) {
            throw new HttpError(404, "Schema not found");
        }
        const targets = await targetRepository.findByStylesheetId(stylesheet.id);
        return {
            ...stylesheet,
            targets,
        };
    },
    async listByUser(userId) {
        return stylesheetRepository.findByUserId(userId);
    },
    async updateSchema(stylesheetId, input) {
        const current = await stylesheetRepository.findById(stylesheetId);
        if (!current) {
            throw new HttpError(404, "Schema not found");
        }
        const updated = await stylesheetRepository.update(stylesheetId, {
            ...(input.name !== undefined ? { name: input.name } : {}),
            ...(input.cssContent !== undefined ? { cssContent: input.cssContent } : {}),
            ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
        });
        if (!updated) {
            throw new HttpError(500, "Schema update failed");
        }
        let targets = await targetRepository.findByStylesheetId(updated.id);
        if (input.urlPatterns !== undefined) {
            await targetRepository.deleteByStylesheetId(updated.id);
            for (const urlPattern of input.urlPatterns) {
                await targetRepository.create({ stylesheetId: updated.id, urlPattern });
            }
            targets = await targetRepository.findByStylesheetId(updated.id);
        }
        return {
            ...updated,
            targets,
            requestedUrlPatterns: input.urlPatterns ?? [],
        };
    },
    async deleteSchema(stylesheetId, userId) {
        const stylesheet = await stylesheetRepository.findById(stylesheetId);
        if (!stylesheet) {
            throw new HttpError(404, "Schema not found");
        }
        if (stylesheet.userId !== userId) {
            throw new HttpError(403, "Unauthorized");
        }
        await targetRepository.deleteByStylesheetId(stylesheetId);
        await stylesheetRepository.delete(stylesheetId);
    },
};
//# sourceMappingURL=stylesheet.service.js.map