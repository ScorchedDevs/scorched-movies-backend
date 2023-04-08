import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `HTTP Request ${req.method} ${req.baseUrl} ${res.statusCode}`,
    );
    next();
  }
}
