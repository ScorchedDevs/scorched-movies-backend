import { AuthService } from './auth.service';
import { Prisma, User } from '@prisma/client';
import { MessageOutput } from 'src/modules/common/dto/message.output';
import { RecoverPasswordInput } from './dto/recover.password.input';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: User): Promise<{
        access_token: string;
    }>;
    signUp(user: Prisma.UserCreateInput): Promise<MessageOutput>;
    confirmEmail({ confirmationToken }: {
        confirmationToken: string;
    }): Promise<MessageOutput>;
    sendRecoverPasswordMail({ email }: {
        email: string;
    }): Promise<MessageOutput>;
    recoverPassword(recoverpasswordInput: RecoverPasswordInput): Promise<MessageOutput>;
}
