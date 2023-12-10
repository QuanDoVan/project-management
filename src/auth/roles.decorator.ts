import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: number[]) => SetMetadata('roles', roles);

export const RolesProject = (...rolesproject: number[]) => SetMetadata('rolesproject', rolesproject);
