export type Target = {
  id: number;
  stylesheetId: number | null;
  urlPattern: string | null;
};

export type CreateTargetInput = {
  stylesheetId?: number | null;
  urlPattern?: string | null;
};

