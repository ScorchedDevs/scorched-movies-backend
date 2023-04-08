import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { MessageOutput } from 'src/modules/common/dto/message.output';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import { RecoverPasswordInput } from './dto/recover.password.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async validateLocalUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user: User = await this.userService.findUser(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  login(user: User) {
    const payload = { id: user.id, username: user.username, roles: user.roles };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: Prisma.UserCreateInput): Promise<MessageOutput> {
    user = await this.userService.createUser(user);
    const mail = {
      to: user.email,
      from: 'noreply@scorchedmovies.com',
      subject: 'Confirmation Email',
      template: 'email-confirmation',
      context: {
        token: user.confirmationToken,
        frontendUrl: this.configService.get('FRONTEND_URL'),
      },
    };
    await this.mailerService.sendMail(mail);
    return {
      message: 'Successfully signed up. Please confirm your e-mail.',
      success: true,
    };
  }

  async confirmEmail(confirmationToken: string): Promise<MessageOutput> {
    const user = await this.userService.findUserByConfirmationToken(
      confirmationToken,
    );
    if (user) {
      user.confirmationToken = null;
      await this.userService.upsert(user);
      return {
        message: 'Email has been confirmed. Try to login now.',
        success: true,
      };
    } else {
      throw new UnprocessableEntityException('Invalid Token');
    }
  }

  async sendRecoverPasswordMail(email: string): Promise<MessageOutput> {
    let user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException(
        'There is no user associated with this e-mail adress',
      );
    }

    user.recoveryToken = randomBytes(32).toString('hex');
    user = await this.userService.upsert(user);

    const mail = {
      to: user.email,
      from: 'noreply@scorchedmovies.com',
      subject: 'Password Recovery',
      template: 'password-recovery',
      context: {
        frontendUrl: this.configService.get('FRONTEND_URL'),
        token: user.recoveryToken,
      },
    };

    await this.mailerService.sendMail(mail);

    return { message: 'A recovery e-mail has been sent.', success: true };
  }

  async recoverPassword(
    recoverPasswordInput: RecoverPasswordInput,
  ): Promise<MessageOutput> {
    let user = await this.userService.findUserByRecoveryToken(
      recoverPasswordInput.recoveryToken,
    );

    if (user) {
      user.password = recoverPasswordInput.password;
      user.recoveryToken = null;
      user = await this.userService.changePassword(user);
      return {
        message: 'Password has been changed. Try to login now',
        success: true,
      };
    } else {
      throw new UnprocessableEntityException('Invalid Token');
    }
  }
}
