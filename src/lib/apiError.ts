export interface apiError {
    statusCode: number;
    message: string;
    success: false;   
    errors?: string[];
}  

class ApiError extends Error implements apiError {
  statusCode!: number;
  message!: string;
  success!: false;
  errors?: string[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: string[] = []
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}   

export default ApiError;