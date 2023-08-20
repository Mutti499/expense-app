import { Injectable } from '@nestjs/common';
import { reports, generateRandomId, ReportType, Report } from "./data";
import { randomUUID } from "crypto";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getAllReports(): Report[] {
    return reports;
  }

  getReportOrType(param: string) {
    if (param === 'income' || param === 'outcome') {
      return reports.filter(report => report.type === param);
    } else {
      const report = reports.find(report => param === report.id);
      return report ? report : 'not found';
    }
  }

  postReport(data : {name : string, type :  ReportType, amount: number}){
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

  putReport(id: string, data: {name : string, type :  ReportType, amount: number}){
    return reports.map(report => {
      if(report.id === id){
        report.name = data.name;
        report.type = data.type, 
        report.amount = data.amount;
        report.updateDate = new Date();
      }
      return report})
  }  

  deleteReport(id: string) {
    const index = reports.findIndex(report => report.id === id);
    
    if (index !== -1) {
      reports.splice(index, 1);
    }
    
    return;
  }
}
