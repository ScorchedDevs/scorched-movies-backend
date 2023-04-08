import { UserService } from 'src/modules/user/user.service';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { MessageOutput } from 'src/modules/common/dto/message.output';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { RecoverPasswordInput } from './dto/recover.password.input';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    private readonly mailerService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService, mailerService: MailerService);
    validateLocalUser(username: string, password: string): Promise<User | null>;
    login(user: User): {
        access_token: string;
    };
    signUp(user: Prisma.UserCreateInput): Promise<MessageOutput>;
    confirmEmail(confirmationToken: string): Promise<MessageOutput>;
    sendRecoverPasswordMail(email: string): Promise<MessageOutput>;
    recoverPassword(recoverPasswordInput: RecoverPasswordInput): Promise<MessageOutput>;
}
