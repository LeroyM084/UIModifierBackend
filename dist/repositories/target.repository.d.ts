import type { CreateTargetInput, Target } from "../models/index.js";
export declare const targetRepository: {
    create(input: CreateTargetInput): Promise<Target>;
    findByStylesheetId(stylesheetId: number): Promise<Target[]>;
    deleteByStylesheetId(stylesheetId: number): Promise<void>;
};
//# sourceMappingURL=target.repository.d.ts.map