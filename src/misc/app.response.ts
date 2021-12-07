export class AppResponse {
  private readonly statusCode: string;

  private readonly message: string;

  private readonly data?: any;

  constructor(statusCode: string, message: string, data?: any) {
    this.statusCode = statusCode;
    this.message = message;
    if (data) {
      this.data = data;
    }
  }
}
