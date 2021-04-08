import { CarImage } from "./carImage";

export interface Car{
    id:number;
    carName:string;
    brandName:string;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    imagePath:string;
    description : string;
    status?:boolean;
    carImages : CarImage[];
    colorId:number;
    brandId:number;

}

