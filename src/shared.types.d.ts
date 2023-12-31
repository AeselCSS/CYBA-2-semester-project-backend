//Controller
type ReqQuery = {
    sortDir: string;
    sortBy: string;
    pageNum: string;
    pageSize: string;
    searchValue?: string;
    filterBy?: string;
};

type ReqParams = {
    id: string;
};

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
    sortDir: string;
    sortBy: string;
    pageNum: number;
    pageSize: number;
    searchValue?: string;
    filterBy?: string;
};

type EmployeeQueryType = QueryType & {
    filterBy: Department;
};

type OrderQueryType = QueryType & {
    filterBy: Status;
};

//Service slut

//Repository
type MetaData = {
    limit: number;
    offset: number;
    totalCount: number;
};

type ResultPagination<T> = {
    data?: T[];
    metaData?: MetaData;
};

//Repository slut

// Car
type NewCar = {
    registrationNumber: string;
    vinNumber: string;
    model: string;
    brand: string;
    modelVariant: string;
    customerId: string;
    firstRegistration: string | Date;
    mileage: number;
    lastInspectionDate: string | Date | null;
    lastInspectionKind: string | null;
    lastInspectionResult: string | null;
};

// Order
type NewOrder = {
    status?: Status;
    orderStartDate: string | Date;
    carId: number;
    customerId: string;
    tasks: Task[];
};

type OrderResult = Order & Car;

type SingleOrder = {
    id: number;
    status: Status;
    orderStartDate: Date;
    createdAt: Date;
    updatedAt: Date;
    car: {
        id: number;
        registrationNumber: string;
        vinNumber: string;
        brand: string;
        model: string;
        modelVariant: string;
        mileage: number;
    };
    customer: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: number;
    };
    taskInstances: {
        id: number;
        status: Status;
        updatedAt: Date;
        employee: {
            firstName: string;
            lastName: string;
            department: Department;
        } | null;
        task: {
            name: string;
            description: string;
        };
        subtaskInstances: {
            id: number;
            status: Status;
            updatedAt: Date;
            subtask: {
                name: string;
                time: number;
                description: string;
            };
        }[];
    }[];
};

type SingleOrderDTO = {
    id: number;
    status: Status;
    totalTime?: number;
    orderStartDate: Date;
    createdAt: Date;
    updatedAt: Date;
    car: {
        id: number;
        registrationNumber: string;
        vinNumber: string;
        brand: string;
        model: string;
        modelVariant: string;
        mileage: number;
    };
    customer: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: number;
    };
    tasks: {
        id: number;
        status: Status;
        updatedAt: Date;
        name: string;
        description: string;
        totalTime: number;
        employee: {
            firstName: string | undefined;
            lastName: string | undefined;
            department: Department;
        } | null;
        subtasks: {
            id: number;
            status: Status;
            name: string;
            time: number;
            description: string;
            updatedAt: Date;
        }[];
    }[];
};

type SingleTaskInstance = {
    id: number;
    status: Status;
    taskId: number;
    employeeId: string | null;
    updatedAt: Date;
    subtaskInstances: {
        id: number;
        status: Status;
        updatedAt: Date;
        subtask: {
            name: string;
            time: number;
            description: string;
        };
    }[];
    taskInstanceComments: {
        id: number;
        comment: string;
        createdAt: Date;
        employee: {
            id: string;
            role: Role;
            department: Department;
            firstName: string;
            lastName: string;
        };
    }[];
};

type SingleCustomer = {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: number;
    phone: number;
    email: string;
    createdAt: Date;
    role: Role;
    orders: {
        id: number;
        status: Status;
        orderStartDate: Date;
        carId: number;
        customerId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    cars: {
        id: number;
        customerId: string;
        registrationNumber: string;
        vinNumber: string;
        brand: string;
        model: string;
        modelVariant: string;
        firstRegistration: Date;
        mileage: number;
        lastInspectionDate: Date | null;
        lastInspectionKind: string | null;
        lastInspectionResult: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
};

type SingleCustomerDTO = {
    customer: {
        id: string;
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        zip: number;
        phone: number;
        email: string;
        role: Role;
        createdAt: Date;
    };
    orders: {
        id: number;
        status: Status;
        orderStartDate: Date;
        carId: number;
        customerId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    cars: {
        id: number;
        customerId: string;
        registrationNumber: string;
        vinNumber: string;
        brand: string;
        model: string;
        modelVariant: string;
        firstRegistration: Date;
        mileage: number;
        lastInspectionDate: Date | null;
        lastInspectionKind: string | null;
        lastInspectionResult: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
};

type Tasks = {
    id: number;
    name: string;
    description: string;
    taskSubtasks: {
        subtask: {
            time: number;
        };
    }[];
};

type SynsBasenAPI = {
    registration: string;
    vin: string;
    brand: string;
    model: string;
    variant: string;
    first_registration_date: string;
    last_inspection_date: string;
    last_inspection_result: string;
    last_inspection_kind: string;
};

type singleCar = {
    id: number;
    registrationNumber: string;
    vinNumber: string;
    brand: string;
    model: string;
    modelVariant: string;
    mileage: number;
    firstRegistration: Date;
    lastInspectionDate: Date | null;
    customer: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: number;
    };
};

type singleCarDTO = {
    car: {
        id: number;
        registrationNumber: string;
        vinNumber: string;
        brand: string;
        model: string;
        modelVariant: string;
        mileage: number;
        firstRegistration: Date;
        lastInspectionDate: Date | null;
    };
    customer: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: number;
    };
};
