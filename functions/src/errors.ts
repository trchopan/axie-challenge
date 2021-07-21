export enum ErrorCode {
  Unauthorized = 'unauthorized',
  NotFound = 'not-found',
  BadRequest = 'bad-request',
  Internal = 'internal-error',
  Unknown = 'unknown-error',
}

export class Errors {
  constructor(
    //
    public code: ErrorCode,
    public message?: string
  ) {}
}
