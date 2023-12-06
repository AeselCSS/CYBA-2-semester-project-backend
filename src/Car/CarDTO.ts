


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