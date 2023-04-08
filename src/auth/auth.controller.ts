import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Prisma, User } from '@prisma/client';
import { MessageOutput } from 'src/modules/common/dto/message.output';
import { RecoverPasswordInput } from './dto/recover.password.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @Public()
  @Post('signUp')
  async signUp(@Body() user: Prisma.UserCreateInput): Promise<MessageOutput> {
    return this.authService.signUp(user);
  }

  @Public()
  @Post('confirmEmail')
  async confirmEmail(
    @Body() { confirmationToken }: { confirmationToken: string },
  ): Promise<MessageOutput> {
    return this.authService.confirmEmail(confirmationToken);
  }

  @Public()
  @Post('sendRecoverPasswordMail')
  async sendRecoverPasswordMail(
    @Body() { email }: { email: string },
  ): Promise<MessageOutput> {
    return this.authService.sendRecoverPasswordMail(email);
  }

  @Public()
  @Post('recoverPassword')
  async recoverPassword(
    @Body() recoverpasswordInput: RecoverPasswordInput,
  ): Promise<MessageOutput> {
    return this.authService.recoverPassword(recoverpasswordInput);
  }
}
