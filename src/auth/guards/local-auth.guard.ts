import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const { user } = context.switchToHttp().getRequest();
    if (user) {
      return true;
    }

    return super.canActivate(context);
  }
}
