


export function synsbasenCarDetailsDTO(carDetailsSynsbasen: SynsBasenAPI) {
    return {
        registrationNumber: carDetailsSynsbasen.registration,
        vinNumber: carDetailsSynsbasen.vin,
        brand: carDetailsSynsbasen.brand,
        model: carDetailsSynsbasen.model,
        modelVariant: carDetailsSynsbasen.variant,
        firstRegistration: carDetailsSynsbasen.first_registration_date,
        //TODO: Hvis null, så sæt den til "Ej været til syn". Skal måske ændres, hvis vi tillader at vores prisma tager imod null
        lastInspectionDate: carDetailsSynsbasen.last_inspection_date ?? "Ej været til syn",
        lastInspectionResult: carDetailsSynsbasen.last_inspection_result ?? "--",
        lastInspectionKind: carDetailsSynsbasen.last_inspection_kind ?? "--",
    }
}