import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `req: ${req.method.toUpperCase()} ${req.originalUrl} - ${res.statusCode} - ${new Date().toISOString()}`,
    );
    if (next) {
      next();
    }
  }
}
