import { HttpError } from "../lib/http-error.js";
import { stylesheetRepository, targetRepository, userRepository } from "../repositories/index.js";

export const stylesheetService = {
  async saveSchema(userId: number, name: string, cssContent: string, urlPatterns: string[] = []) {
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

  async getSchema(userId: number, name: string) {
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

  async listByUser(userId: number) {
    return stylesheetRepository.findByUserId(userId);
  },

  async updateSchema(
    stylesheetId: number,
    input: { name?: string; cssContent?: string; isActive?: boolean; urlPatterns?: string[] },
  ) {
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

    return {
      ...updated,
      targets: await targetRepository.findByStylesheetId(updated.id),
      requestedUrlPatterns: input.urlPatterns ?? [],
    };
  },
};
