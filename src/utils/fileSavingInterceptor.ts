import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createWriteStream } from 'fs';

@Injectable()
export class FileSavingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const body = request.body;
    const file = request.file;

    if (file) {
      const path = `uploadss/${file.originalname}`;
      const writeStream = createWriteStream(path);

      response.on('finish', () => {
        // File has been written to disk
        console.log(`File saved to ${path}`);
      });

      file.stream.pipe(writeStream);
    }

    return next.handle();
  }
}
