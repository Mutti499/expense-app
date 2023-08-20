import { Controller, Get , Post, Delete, Put, Param, Body, HttpCode, UploadedFile} from "@nestjs/common";
import { ReportType, Report } from "./data";
import { AppService } from "./app.service";


@Controller('reports')
export class AppController {

  constructor(private appService: AppService) {}

  @Get()
  getAllReports(): Report[] {
    return this.appService.getAllReports();
  }

  @Get(":param")
  getReportOrType(@Param('param') param: string) {
    return this.appService.getReportOrType(param);
  }

  @Post("/new")
  postReport(@Body() data: {name : string, type : ReportType, amount: number}): Report[] {
    return this.appService.postReport(data);
  }

  @Put("/:id")
  putReport(@Param('id') id: string, 
            @Body() data: {name : string, type : ReportType, amount: number}): Report[] {
    return this.appService.putReport(id, data);
  }

  @HttpCode(204)
  @Delete("/:id")
  deleteReport(@Param('id') id: string) {
    return this.appService.deleteReport(id);
  }

}