import { randomUUID } from "crypto";

enum ReportType {
    income = "income",
    outcome = "outcome"
}

interface Report {
    name: string;
    type: ReportType;
    amount: number;
    id: string;   
    createDate: Date;
    updateDate?: Date;// not mendetory because it may be not be updated
}

const generateRandomId = (type : string) => {
    if (type === 'uuid') {
        return randomUUID();
    } else {
        let num = Math.floor(Math.random() * 1000);
        return num.toString();
    }
};

const reports : Report[] = [
  {name: 'family', type: ReportType.income, id: generateRandomId( "uuid"), createDate: new Date(), updateDate: new Date(), amount: 2000 },
  {name: 'school', type: ReportType.outcome, id: generateRandomId("uuid"), createDate: new Date(), updateDate: new Date(), amount: 1000 },
  {name: 'scholarship', type: ReportType.income, id: generateRandomId("uuid"), createDate: new Date(), updateDate: new Date(), amount: 200 },
  {name: 'girlfriend', type: ReportType.outcome, id: generateRandomId("uuid"), createDate: new Date(), updateDate: new Date(), amount: 700 },
]


export{ reports , generateRandomId, ReportType, Report};