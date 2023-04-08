import { Injectable, Logger } from '@nestjs/common';
import { Movie, Prisma, Role, User } from '@prisma/client';
import { MessageOutput } from '../common/dto/message.output';
import { PrismaService } from 'nestjs-prisma';
import { UsersRolesBulkInput } from './dto/role.input';
import { UtilsService } from 'src/utils/utils.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  private readonly logger = new Logger(UserService.name);

  upsert(
    userCreateInput: Prisma.UserCreateInput,
    movie?: Movie,
  ): Promise<User> {
    if (movie) {
      userCreateInput.Movie = {
        connectOrCreate: {
          create: movie,
          where: { id: movie.id },
        },
      };
    }
    return this.prisma.user.upsert({
      where: { email: userCreateInput.email },
      create: userCreateInput,
      update: userCreateInput,
    });
  }

  findUser(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserByConfirmationToken(confirmationToken): Promise<User> {
    return this.prisma.user.findFirst({
      where: { confirmationToken },
    });
  }

  async findUserByRecoveryToken(recoveryToken): Promise<User> {
    return this.prisma.user.findFirst({
      where: { recoveryToken },
    });
  }

  async addRole(
    userRolesBulkInput: UsersRolesBulkInput,
  ): Promise<MessageOutput[]> {
    const messages: MessageOutput[] = [];
    await this.utilsService.forEachAsync(
      userRolesBulkInput.users,
      async ({ id, roles }) => {
        try {
          const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
              roles: true,
              username: true,
            },
          });
          await this.prisma.user.update({
            where: { id },
            data: {
              roles: {
                push: roles.filter((role) => !user.roles.includes(role)),
              },
            },
          });
          messages.push({
            message: `Roles do usuário ${user.username} atualizadas com sucesso`,
            success: true,
          });
        } catch (error) {
          this.logger.error(error);
          messages.push({
            message: `Erro ao atualizar role: ${error}`,
            success: false,
          });
        }
      },
    );
    return messages;
  }

  async removeRole(
    userRolesBulkInput: UsersRolesBulkInput,
  ): Promise<MessageOutput[]> {
    const messages: MessageOutput[] = [];
    await this.utilsService.forEachAsync(
      userRolesBulkInput.users,
      async ({ id, roles }) => {
        try {
          const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
              roles: true,
              username: true,
            },
          });
          await this.prisma.user.update({
            where: { id },
            data: {
              roles: {
                set: user.roles.filter((role) => !roles.includes(role)),
              },
            },
          });
          messages.push({
            message: `Roles do usuário ${user.username} atualizadas com sucesso`,
            success: true,
          });
        } catch (error) {
          this.logger.error(error);
          messages.push({
            message: `Erro ao atualizar role: ${error}`,
            success: false,
          });
        }
      },
    );
    return messages;
  }
  async createUser(userCreateInput: Prisma.UserCreateInput): Promise<User> {
    const salt = await bcrypt.genSalt();
    userCreateInput.password = await bcrypt.hash(
      userCreateInput.password,
      salt,
    );
    return await this.upsert(userCreateInput);
  }

  async changePassword(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return await this.upsert(user);
  }
}
