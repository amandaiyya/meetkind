export interface apiResponse<T = any> {
    statusCode: number;
    success: boolean;
    data: T | null;
    message: string;
}

class ApiResponse<T = any> implements apiResponse<T>{
    statusCode: number;
    data: T | null;
    message: string;
    success: boolean;

    constructor(statusCode: number, data: T | null, message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export default ApiResponse;