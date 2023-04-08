import { UserService } from './user.service';
import { MessageOutput } from '../common/dto/message.output';
import { UsersRolesBulkInput } from './dto/role.input';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addRole(userRolesBulkInput: UsersRolesBulkInput): Promise<MessageOutput[]>;
    removeRole(userRolesBulkInput: UsersRolesBulkInput): Promise<MessageOutput[]>;
}
