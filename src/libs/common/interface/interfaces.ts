// export interface IReqApi<T> {
//   errorMessages: {
//     errorCode: string;
//     errors: {
//       fieldName: string;
//       errorValues: string[];
//       exactValues: string[];
//     };
//   }[];
//   isOK: boolean;
//   statusCode: number;
//   result: T;
// }
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