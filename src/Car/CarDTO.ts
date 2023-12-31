export function singleCarDTO(rawCar: singleCar): singleCarDTO {
    return {
        car: {
            id: rawCar.id,
            registrationNumber: rawCar.registrationNumber,
            brand: rawCar.brand,
            firstRegistration: rawCar.firstRegistration,
            lastInspectionDate: rawCar.lastInspectionDate,
            mileage: rawCar.mileage,
            model: rawCar.model,
            modelVariant: rawCar.modelVariant,
            vinNumber: rawCar.vinNumber,
        },
        customer: {
            email: rawCar.customer.email,
            firstName: rawCar.customer.firstName,
            lastName: rawCar.customer.lastName,
            id: rawCar.customer.id,
            phone: rawCar.customer.phone,
        },
    };
}

export function synsbasenCarDetailsDTO(carDetailsSynsbasen: SynsBasenAPI) {
    return {
        registrationNumber: carDetailsSynsbasen.registration,
        vinNumber: carDetailsSynsbasen.vin,
        brand: carDetailsSynsbasen.brand,
        model: carDetailsSynsbasen.model,
        modelVariant: carDetailsSynsbasen.variant,
        firstRegistration: carDetailsSynsbasen.first_registration_date,
        lastInspectionDate: carDetailsSynsbasen.last_inspection_date ?? "",
        lastInspectionResult: carDetailsSynsbasen.last_inspection_result ?? "",
        lastInspectionKind: carDetailsSynsbasen.last_inspection_kind ?? "",
    }
}

