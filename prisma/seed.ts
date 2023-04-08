import { Logger } from '@nestjs/common';
import { Prisma, PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const logger = new Logger('Prisma Seed');

async function main() {
  const user: Prisma.UserCreateInput = {
    email: 'admin@admin.com',
    username: 'admin',
    name: 'Admin',
    password: process.env.ADMIN_PASSWORD,
    confirmationToken: null,
    roles: [Role.ADMIN],
  };

  const salt = await bcrypt.genSalt();
  logger.log(salt);
  user.password = await bcrypt.hash(user.password, salt);

  const admin = await prisma.user.upsert({
    where: { email: user.email },
    update: user,
    create: user,
  });
  logger.log(`Created user ${admin.username}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
