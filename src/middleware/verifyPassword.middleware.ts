import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class VerifyPasswordMiddleware implements NestMiddleware {
  constructor(private readonly accountService: AccountService) { }

  use(req: Request, res: Response, next: NextFunction) {
    this.accountService
      .checkPassword(req.params.id, req.body.password)
      .then(() => {
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
}
