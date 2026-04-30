export type Stylesheet = {
    id: number;
    userId: number | null;
    name: string | null;
    cssContent: string | null;
    isActive: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CreateStylesheetInput = {
    userId?: number | null;
    name?: string | null;
    cssContent?: string | null;
    isActive?: boolean;
};
export type UpdateStylesheetInput = Partial<CreateStylesheetInput>;
//# sourceMappingURL=stylesheet.model.d.ts.map