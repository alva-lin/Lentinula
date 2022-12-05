export class ResponseResult<T> {
  code: number = 0;
  data: T | null = null;
  message: string | null = null;
  errorMessage: string | null = null;
}
