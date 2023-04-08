export declare class UtilsService {
    forEachAsync<T>(array: T[], fn: (element: T, index: number, array: T[]) => Promise<void>): Promise<void>;
}
