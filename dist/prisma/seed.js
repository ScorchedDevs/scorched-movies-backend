"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const logger = new common_1.Logger('Prisma Seed');
async function main() {
    const user = {
        email: 'admin@admin.com',
        username: 'admin',
        name: 'Admin',
        password: process.env.ADMIN_PASSWORD,
        confirmationToken: null,
        roles: [client_1.Role.ADMIN],
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
//# sourceMappingURL=seed.js.map