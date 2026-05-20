import type { CreateStylesheetInput, Stylesheet, UpdateStylesheetInput } from "../models/index.js";
export declare const stylesheetRepository: {
    create(input: CreateStylesheetInput): Promise<Stylesheet>;
    findById(id: number): Promise<Stylesheet | null>;
    findByUserId(userId: number): Promise<Stylesheet[]>;
    findByUserIdAndName(userId: number, name: string): Promise<Stylesheet | null>;
    update(id: number, input: UpdateStylesheetInput): Promise<Stylesheet | null>;
    delete(id: number): Promise<void>;
};
//# sourceMappingURL=stylesheet.repository.d.ts.map