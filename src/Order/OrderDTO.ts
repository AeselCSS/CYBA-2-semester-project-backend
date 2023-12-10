async function ordersDTO(orders: ResultPagination<any>) {
    const newData = orders.data?.map((rawOrder) => {
        return {
            id: rawOrder.id,
            customerId: rawOrder.customerId,
            status: rawOrder.status,
            orderStartDate: rawOrder.orderStartDate,
            createdAt: rawOrder.createdAt,
            updatedAt: rawOrder.updatedAt,
            registrationNumber: rawOrder.car.registrationNumber,
            vinNumber: rawOrder.car.vinNumber,
        };
    });

    return {
        data: newData,
        metaData: orders.metaData,
    };
}

async function ordersStartDatesDTO(startDates: {orderStartDate: Date}[]) {
    const datesArr = startDates.map((item) => {
        return item.orderStartDate.toISOString().split("T")[0]
    })

    //return only unique values (dates) in an array
    return [...new Set(datesArr)]
}

async function orderDTO(order: SingleOrder) {
    const DTO: SingleOrderDTO = {
        id: order.id,
        status: order.status,
        totalTime: undefined,
        orderStartDate: order.orderStartDate,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        car: {
            id: order.car.id,
            registrationNumber: order.car.registrationNumber,
            vinNumber: order.car.vinNumber,
            brand: order.car.brand,
            model: order.car.model,
            modelVariant: order.car.modelVariant,
            mileage: order.car.mileage,
        },
        customer: {
            id: order.customer.id,
            firstName: order.customer.firstName,
            lastName: order.customer.lastName,
            email: order.customer.email,
            phone: order.customer.phone,
        },
        tasks: order.taskInstances.map((task) => {
            return {
                id: task.id,
                name: task.task.name,
                description: task.task.description,
                status: task.status,
                updatedAt: task.updatedAt,
                totalTime: task.subtaskInstances.reduce((acc, item) => item.subtask.time + acc, 0),
                employee: {
                    firstName: task.employee?.firstName,
                    lastName: task.employee?.lastName,
                    department: task.employee?.department,
                },
                subtasks: task.subtaskInstances.map((subtask) => {
                    return {
                        id: subtask.id,
                        name: subtask.subtask.name,
                        description: subtask.subtask.description,
                        time: subtask.subtask.time,
                        status: subtask.status,
                        updatedAt: subtask.updatedAt,
                    };
                }),
            };
        }),
    };

    DTO.tasks = DTO.tasks.map((task) =>
        task.employee?.firstName ? { ...task } : { ...task, employee: null }
    );

    return DTO;
}

export { ordersDTO, orderDTO, ordersStartDatesDTO};
