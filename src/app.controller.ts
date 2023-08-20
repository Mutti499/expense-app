import { Controller, Get , Post, Delete, Put, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe} from "@nestjs/common";
import { ReportType, Report } from "./data";
import { AppService } from "./app.service";
import { createReportDto, updateReportDto } from "./dtos/report.dto";

@Controller('reports')
export class AppController {

  constructor(private appService: AppService) {}

  @Get()
  getAllReports(): Report[] {
    return this.appService.getAllReports();
  }

  @Get("/type/:type")
  getWithType(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    return this.appService.getWithType(type === 'income' ? ReportType.income : ReportType.outcome);
  }

  @Get(":id")
  getWithID(@Param('id', ParseUUIDPipe ) id: string) {
    return this.appService.getWithID(id);
  }

  @Post("/new")
  createReport(@Body() data: createReportDto): Report[] {
    return this.appService.createReport(data);
  }

  @Put("/:id")
  putReport(@Param('id', ParseUUIDPipe) id: string, 
            @Body() data: updateReportDto ): Report[] {
    return this.appService.putReport(id, data);
  }

  @HttpCode(204)
  @Delete("/:id")
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }

}