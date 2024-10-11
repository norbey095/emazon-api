export interface PaginationDto<T>{
    contentList: T[];
    totalElement: number;
    totalPages: number;
}