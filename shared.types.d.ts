
export interface IPagination<T>{
    getAllItemsPagination: (limit: number, offset: number, sortBy: string, sortDir: string) => Promise<T[]>,
    getAllItemsSearchPagination: (limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string) => Promise<T[]>,
    getAllItemsFilterPagination?: (limit: number, offset: number, sortBy: string, sortDir: string, filterBy: string) => Promise<T[]>,
    getAllItemsAllPagination?: (limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string, filterBy: string) => Promise<T[]>
}


