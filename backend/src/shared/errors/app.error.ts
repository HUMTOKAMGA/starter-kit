export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(errors: Record<string, string[]>) {
    super(400, "Validation failed", errors);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message);
    this.name = "ConflictError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}
