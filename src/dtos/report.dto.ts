//used "npm install class-validator class-transformer" 
import { ReportType } from "../data";
import { IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional } from "class-validator";
import { IsValidReportType } from '../custom/valid-report.validator';
import { Optional } from "@nestjs/common";


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