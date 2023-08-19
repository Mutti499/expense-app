import { Controller, Get , Post, Delete, Put, Param, Body} from "@nestjs/common";
import { randomUUID } from "crypto";

const generateRandomId = () => {
  let num = Math.floor(Math.random() * 1000);
  return num.toString();
};
interface Report {
  name: string;
  type: "income" | "outcome";
  idR: string;
}

let reports : Report[] = [
  // {name: 'report1', type: "income", idR: generateRandomId() },
  // {name: 'report2', type: "outcome", idR: generateRandomId() },
  {name: 'report1', type: "income", idR: "1" },
  {name: 'report2', type: "outcome", idR: "2" },
  {name: 'report3', type: "income", idR: generateRandomId() },
  {name: 'report3', type: "outcome", idR: generateRandomId() },
]

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
      const report = reports.find(report => param === report.idR);
      return report ? report : 'not found';
    }
  }

  @Post("/new")
  postReport(@Body() data: {name : string, type :  "income" | "outcome"}): Report[] {

    let newIDR = generateRandomId() || randomUUID();
    let report = { name : data.name, type : data.type, idR: newIDR};
    reports.push(report);
    return reports;
  }

  @Put("/:id")
  putReport(@Param('id') id: string, 
            @Body() data: {name : string}): Report[] {
    return reports.map(report => {
      if(report.idR === id){
        report.name = data.name;
      }
      return report})
  }

  @Delete("/:id")
  deleteReport(@Param('id') id: string): Report[] {
    return reports.filter(report => report.idR !== id);
  }
}