import { Movie, Prisma, User } from '@prisma/client';
import { MessageOutput } from '../common/dto/message.output';
import { PrismaService } from 'nestjs-prisma';
import { UsersRolesBulkInput } from './dto/role.input';
import { UtilsService } from 'src/utils/utils.service';
export declare class UserService {
    private readonly prisma;
    private readonly utilsService;
    constructor(prisma: PrismaService, utilsService: UtilsService);
    private readonly logger;
    upsert(userCreateInput: Prisma.UserCreateInput, movie?: Movie): Promise<User>;
    findUser(username: string): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    findUserByConfirmationToken(confirmationToken: any): Promise<User>;
    findUserByRecoveryToken(recoveryToken: any): Promise<User>;
    addRole(userRolesBulkInput: UsersRolesBulkInput): Promise<MessageOutput[]>;
    removeRole(userRolesBulkInput: UsersRolesBulkInput): Promise<MessageOutput[]>;
    createUser(userCreateInput: Prisma.UserCreateInput): Promise<User>;
    changePassword(user: User): Promise<User>;
}
