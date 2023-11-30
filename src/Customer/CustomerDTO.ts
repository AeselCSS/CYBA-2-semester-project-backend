
export const singleCustomerDTO = (singleCustomer: SingleCustomer): SingleCustomerDTO => {
    return {
        customer: {
            id: singleCustomer.id,
            firstName: singleCustomer.firstName,
            lastName: singleCustomer.lastName,
            address: singleCustomer.address,
            city: singleCustomer.city,
            zip: singleCustomer.zip,
            phone: singleCustomer.phone,
            email: singleCustomer.email,
            role: singleCustomer.role,
        },
        orders: singleCustomer.orders.map((order) => {
            return {
                id: order.id,
                status: order.status,
                orderStartDate: order.orderStartDate,
                carId: order.carId,
                customerId: order.customerId,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
            };
        }),
        cars: singleCustomer.cars.map((car) => {
            return {
                id: car.id,
                customerId: car.customerId,
                registrationNumber: car.registrationNumber,
                vinNumber: car.vinNumber,
                brand: car.brand,
                model: car.model,
                modelVariant: car.modelVariant,
                firstRegistration: car.firstRegistration,
                mileage: car.mileage,
                lastInspectionDate: car.lastInspectionDate,
                lastInspectionKind: car.lastInspectionKind,
                lastInspectionResult: car.lastInspectionResult,
                createdAt: car.createdAt,
                updatedAt: car.updatedAt,
            };
        }),
    };
}