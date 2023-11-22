



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
        };
    });

    return {
        data: newData,
        metaData: orders.metaData,
    };
}

export { ordersDTO };