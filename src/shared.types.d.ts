

interface IPagination<T> {
    getAllItemsPagination: (limit: number, offset: number, sortBy: string, sortDir: string) => Promise<ResultPagination<T>>;
    getAllItemsSearchPagination: (limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string) => Promise<ResultPagination<T>>;
    getAllItemsFilterPagination?: (limit: number, offset: number, sortBy: string, sortDir: string, filterBy: string | Department) => Promise<ResultPagination<T>>;
    getAllItemsAllPagination?: (limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string, filterBy: string | Department) => Promise<ResultPagination<T>>;
}

//Controller
type ReqQuery = {
    sortDir: string,
    sortBy: string,
    pageNum: string,
    pageSize: string,
    searchValue?: string,
    filterBy?: string
}

type ReqParams = {
    id: string
}


type EmployeeReqBody = {
    id: string;
    role: Role;
    department: Department;
    firstName: string;
    lastName: string;
};

type CustomerReqBody = {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: number;
    phone: number;
    email: string;
};



//Controller slut

//Service

type QueryType = {
    sortDir: string,
    sortBy: string,
    pageNum: number,
    pageSize: number,
    searchValue?: string,
    filterBy?: string
}

type EmployeeQueryType = QueryType & {
    filterBy: Department
}

//Service slut

//Repository
type MetaData = {
    limit: number,
    offset: number,
    totalCount: number
}

type ResultPagination<T> = {
    data?: T[],
    metaData?: MetaData
}

//Repository slut

// Car
type NewCar = {
    registrationNumber: string,
    vinNumber: string,
    model: string,
    brand: string,
    modelVariant: string,
    customerId: string,
    firstRegistration: string | Date,
    mileage: number,
    lastInspectionDate: string | Date,
    lastInspectionKind: string,
    lastInspectionResult: string
}
