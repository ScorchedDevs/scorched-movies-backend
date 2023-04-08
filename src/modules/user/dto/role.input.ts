import { Role } from '@prisma/client';

interface UserRoles {
  id: string;
  roles: Role[];
}

export interface UsersRolesBulkInput {
  users: UserRoles[];
}
