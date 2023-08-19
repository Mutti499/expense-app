import { Controller, Get , Post, Delete, Put, Param, Body, HttpCode, UploadedFile} from "@nestjs/common";
import { reports, generateRandomId, ReportType, Report } from "./data";
import { randomUUID } from "crypto";



@Controller('reports')
export class AppController {

  @Get()
  getAllReports(): Report[] {
    return reports;
  }

  @Get(":param")
  getReportOrType(@Param('param') param: string) {
    if (param === 'income' || param === 'outcome') {
      return reports.filter(report => report.type === param);
    } else {
      const report = reports.find(report => param === report.id);
      return report ? report : 'not found';
    }
  }

  @Post("/new")
  postReport(@Body() data: {name : string, type :  ReportType, amount: number}): Report[] {
    let report = { 
      name : data.name, 
      type : data.type, 
      id: generateRandomId() || randomUUID(),
      createDate: new Date(),
      amount: data.amount  
    };
    reports.push(report);
    return reports;
  }

  @Put("/:id")
  putReport(@Param('id') id: string, 
            @Body() data: {name : string, type :  ReportType, amount: number}): Report[] {
    return reports.map(report => {
      if(report.id === id){
        report.name = data.name;
        report.type = data.type, 
        report.amount = data.amount;
        report.updateDate = new Date();
      }
      return report})
  }

  @HttpCode(204)
  @Delete("/:id")
  deleteReport(@Param('id') id: string) {
    const index = reports.findIndex(report => report.id === id);
    
    if (index !== -1) {
      reports.splice(index, 1);
    }
    
    return;
  }

}