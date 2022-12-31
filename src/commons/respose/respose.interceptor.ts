import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResposeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((incommingData) => RemappingData(incommingData)));
  }
}

function RemappingData(incomingData) {
  const response: any = {
    data: null,
  };

  if (Array.isArray(incomingData)) {
    response.data = incomingData;
  } else {
    response.data = incomingData.data || incomingData;
  }
  return response;
}
