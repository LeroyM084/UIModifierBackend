import type { Request, Response } from "express";
import { stylesheetService } from "../services/stylesheet.service.js";

export async function saveSchema(request: Request, response: Response) {
  const { userId, name, cssContent, urlPatterns } = request.body as {
    userId?: number;
    name?: string;
    cssContent?: string;
    urlPatterns?: string[];
  };

  const schema = await stylesheetService.saveSchema(
    userId ?? 0,
    name ?? "",
    cssContent ?? "",
    urlPatterns ?? [],
  );

  response.status(201).json(schema);
}

export async function getSchema(request: Request, response: Response) {
  const userId = Number(request.params.userId);
  const name = String(request.params.name);

  const schema = await stylesheetService.getSchema(userId, name);
  response.status(200).json(schema);
}

export async function listSchemasByUser(request: Request, response: Response) {
  const userId = Number(request.params.userId);

  const schemas = await stylesheetService.listByUser(userId);
  response.status(200).json(schemas);
}

export async function updateSchema(request: Request, response: Response) {
  const stylesheetId = Number(request.params.id);
  const { name, cssContent, isActive, urlPatterns } = request.body as {
    name?: string;
    cssContent?: string;
    isActive?: boolean;
    urlPatterns?: string[];
  };

  const schema = await stylesheetService.updateSchema(stylesheetId, {
    ...(name !== undefined ? { name } : {}),
    ...(cssContent !== undefined ? { cssContent } : {}),
    ...(isActive !== undefined ? { isActive } : {}),
    ...(urlPatterns !== undefined ? { urlPatterns } : {}),
  });

  response.status(200).json(schema);
}
