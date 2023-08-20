//This interceptor is created to understand the concept of ClassSerializerInterceptor in the app.module.ts file

import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map } from "rxjs";

export class CustomInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) { //context is the request and next is the response
        //request part
        //console.log(context.switchToHttp().getRequest().url);// get the url of the request
        
        //response part
        return next.handle().pipe(map((data) => {
            console.log(data);
            console.log(data.createDate);

            return data.map((data) => {
                const response = {...data, createdWhen : data.createDate, updatedWhen : data.updateDate};
                delete response.createDate;
                delete response.updateDate;
                return response;
            });

        }
        ));
    }
  
}