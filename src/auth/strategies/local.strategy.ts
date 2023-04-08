import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { EmailNotConfirmedException } from 'src/config/exceptions/custom.exceptions';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateLocalUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    } else if (user.confirmationToken) {
      throw new EmailNotConfirmedException();
    }
    return user;
  }
}
