import { Injectable } from '@nestjs/common';
import { reports, generateRandomId, ReportType, Report } from "../data";
import { responseReportDto } from '../dtos/report.dto';

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
export class ReportService {
  getAllReports(): Report[] {
    return reports.map(report => new responseReportDto(report));
  }
  getWithType(type: ReportType) {
    return (reports.filter(report => report.type === type).map(report => new responseReportDto(report)));
  }

  getWithID(id: string) {
    const report = reports.find(report => id === report.id);
    return report ? new responseReportDto(report) : 'not found';
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
    return reports.map(report => new responseReportDto(report));
  }

  putReport(id: string, data: updateReport){
    return reports.map(report => {
      if(report.id === id){
        return new responseReportDto({...report, ...data, updateDate: new Date()})
      }
      return new responseReportDto(report);})
  }  

  deleteReport(id: string) {
    const index = reports.findIndex(report => report.id === id);
    
    if (index !== -1) {
      reports.splice(index, 1);
    }
    
    return;
  }
}
