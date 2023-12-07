
export interface IReqApi<T> {
  content: T,
  pageable: {
    pageNumber: number,
    pageSize: number,
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset: number,
    paged: boolean,
    unpaged: boolean
  },
  last: boolean,
  totalPages: number,
  totalElements: number,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  first: boolean,
  numberOfElements: number,
  empty: boolean
}

export interface IBaseResponse<T> {
  code: number;
  data: T;
  isOK: boolean;
  message: string;
}

export interface IRoleGuard {
  ADMIN: 'admin';
  USER: 'user';
  CUSTOMER: 'customer'
}