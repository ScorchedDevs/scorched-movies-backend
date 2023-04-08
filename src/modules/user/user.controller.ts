import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Prisma, Role } from '@prisma/client';
import { MessageOutput } from '../common/dto/message.output';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UsersRolesBulkInput } from './dto/role.input';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Patch('roles')
  addRole(
    @Body() userRolesBulkInput: UsersRolesBulkInput,
  ): Promise<MessageOutput[]> {
    return this.userService.addRole(userRolesBulkInput);
  }

  @Roles(Role.ADMIN)
  @Delete('roles')
  removeRole(
    @Body() userRolesBulkInput: UsersRolesBulkInput,
  ): Promise<MessageOutput[]> {
    return this.userService.removeRole(userRolesBulkInput);
  }
}
