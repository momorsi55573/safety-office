import {  IsNotEmpty} from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    title: string;
   
    @IsNotEmpty()
    keyWords: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    WholesalePrice: number;

    @IsNotEmpty()
    discount: number;
}

