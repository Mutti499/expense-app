//used "npm install class-validator class-transformer" 
import { ReportType } from "../data";
import { IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional } from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { IsValidReportType } from '../custom/valid-report.validator';


export class createReportDto {
    @IsString()
    @IsNotEmpty()
    name : string;

    @IsValidReportType()
    @IsNotEmpty()
    type : ReportType; 

    @IsNumber()
    @IsPositive()
    amount: number
}

export class updateReportDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name : string;

    @IsOptional()
    @IsValidReportType()
    @IsNotEmpty()
    type : ReportType; 

    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number
}

export class responseReportDto {
    name: string;
    type: ReportType;
    amount: number;
    id: string;

    @Exclude()
    createDate: Date;

    @Expose({name: 'createdWhen'})//change the name of the property to createdWhen
    getCreatedDate(): Date {
        return this.createDate;
    }

    @Exclude()
    updateDate?: Date;    

    constructor(partial: Partial<responseReportDto>) {
        Object.assign(this, partial);
    }
}