import { Injectable } from '@nestjs/common';
import { reports, generateRandomId, ReportType, Report } from "./data";


interface createReport {
  name : string;
  type : ReportType;
  amount: number;
}

interface updateReport {
  name? : string;
  type? : ReportType;
  amount?: number;
}

@Injectable()
export class AppService {
  getAllReports(): Report[] {
    return reports;
  }


  getWithType(type: ReportType) {
    return reports.filter(report => report.type === type);
  }

  getWithID(id: string) {
    const report = reports.find(report => id === report.id);
    return report ? report : 'not found';
  }

  createReport(data : createReport){
    let report = { 
      name : data.name, 
      type : data.type, 
      id: generateRandomId("uuid"),
      createDate: new Date(),
      amount: data.amount  
    };
    reports.push(report);
    return reports;
  }

  putReport(id: string, data: updateReport){
    return reports.map(report => {
      if(report.id === id){
        return {...report, ...data}
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
