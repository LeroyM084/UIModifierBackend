import type { CreateTargetInput, Target } from "../models/index.js";
export declare const targetRepository: {
    create(input: CreateTargetInput): Promise<Target>;
    findByStylesheetId(stylesheetId: number): Promise<Target[]>;
};
//# sourceMappingURL=target.repository.d.ts.map