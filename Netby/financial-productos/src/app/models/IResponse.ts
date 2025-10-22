export interface IResponse<T> {
    success: boolean;
    error: boolean;
    message: string | null;
    data: T | null;
}