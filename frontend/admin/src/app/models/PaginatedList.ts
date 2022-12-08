export interface PaginatedList<T> {
  data: T[];

  totalCount: number;

  totalPages: number;

  currentPage: number;

  pageSize: number;

  hasPrev: boolean;

  hasNext: boolean;
}
