export interface Rental{
    id?: number,
    carId: number,
    customerId: number,
    rentDate: Date,
    returnDate: Date,
    carDescription: string,
    brandName: string,
    firstName?: string,
    lastName?: string,
    colorName: string,
    carDailyPrice:number,

}
