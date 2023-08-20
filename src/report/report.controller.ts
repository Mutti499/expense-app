import { Controller, Get , Post, Delete, Put, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe} from "@nestjs/common";
import { ReportType, Report } from "../data";
import { ReportService } from "./report.service";
import { createReportDto, updateReportDto } from "../dtos/report.dto";

@Controller('reports')
export class ReportController {

    constructor(private reportService: ReportService) {}
  
    @Get()
    getAllReports(): Report[] {
      return this.reportService.getAllReports();
    }
  
    @Get("/type/:type")
    getWithType(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
      return this.reportService.getWithType(type === 'income' ? ReportType.income : ReportType.outcome);
    }
  
    @Get(":id")
    getWithID(@Param('id', ParseUUIDPipe ) id: string) {
      return this.reportService.getWithID(id);
    }
  
    @Post("/new")
    createReport(@Body() data: createReportDto): Report[] {
      return this.reportService.createReport(data);
    }
  
    @Put("/:id")
    putReport(@Param('id', ParseUUIDPipe) id: string, 
              @Body() data: updateReportDto ): Report[] {
      return this.reportService.putReport(id, data);
    }
  
    @HttpCode(204)
    @Delete("/:id")
    deleteReport(@Param('id', ParseUUIDPipe) id: string) {
      return this.reportService.deleteReport(id);
    }
  
  }