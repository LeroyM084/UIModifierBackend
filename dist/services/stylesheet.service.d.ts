export declare const stylesheetService: {
    saveSchema(userId: number, name: string, cssContent: string, urlPatterns?: string[]): Promise<import("../models/stylesheet.model.js").Stylesheet>;
    getSchema(userId: number, name: string): Promise<{
        targets: import("../models/target.model.js").Target[];
        id: number;
        userId: number | null;
        name: string | null;
        cssContent: string | null;
        isActive: boolean;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    listByUser(userId: number): Promise<import("../models/stylesheet.model.js").Stylesheet[]>;
    updateSchema(stylesheetId: number, input: {
        name?: string;
        cssContent?: string;
        isActive?: boolean;
        urlPatterns?: string[];
    }): Promise<{
        targets: import("../models/target.model.js").Target[];
        requestedUrlPatterns: string[];
        id: number;
        userId: number | null;
        name: string | null;
        cssContent: string | null;
        isActive: boolean;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    deleteSchema(stylesheetId: number, userId: number): Promise<void>;
};
//# sourceMappingURL=stylesheet.service.d.ts.map