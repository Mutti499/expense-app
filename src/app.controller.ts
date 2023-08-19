import { Controller, Get , Post, Delete, Put, Param, Body} from "@nestjs/common";

interface Report {
  name: string;
  idR: string;
}

let reports : Report[] = [
  {name: 'report1', idR: "1"},
  {name: 'report2', idR: "2"},
  {name: 'report3', idR: "3"},
]

@Controller('report')
export class AppController {

  @Get("/:id")
  getReport(@Param('id') id: string) {

    let report = reports.find(report => id === report.idR);
    return report ? report : 'not found';
  }

  @Post("/new")
  postReport(@Body() report: Report): Report {
    console.log(report);
    // reports.push({name: 'report4', idR: "4"});
    return report;
  }

}