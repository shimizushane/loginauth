import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('context:', context);

    const ar = context.getArgs();
    console.log('args:', ar);
    const cl = context.getClass();
    console.log('class:', cl);
    const sw = context.switchToHttp();
    console.log('name:', sw.getRequest());
    const ws = context.switchToWs();
    console.log('ws:', ws);

    return true;
  }
}
