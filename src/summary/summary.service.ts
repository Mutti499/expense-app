import { Injectable } from '@nestjs/common';
import e from 'express';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {

    constructor(private readonly reportService: ReportService) { }


    calculateExpenses() {
        const reports = this.reportService.getAllReports();
        const { expense, income } = reports.reduce((acc, report) => {
            if (report.type === ReportType.income) {
                return { ...acc, income: acc.income + report.amount };
            } else if (report.type === ReportType.outcome) {
                return { ...acc, expense: acc.expense + report.amount };
            }
            return acc;
        }, { expense: 0, income: 0 });
        // console.log('Income:', income);
        // console.log('Expense:', expense);

        return income - expense

    }
}
