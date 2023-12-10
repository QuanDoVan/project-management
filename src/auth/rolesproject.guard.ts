import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesProjectGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<number[]>('rolesproject', context.getHandler())
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        
        const requestParam = context.switchToHttp().getRequest().params;
        const requestBody = context.switchToHttp().getRequest().body;
        const requestQuery = context.switchToHttp().getRequest().query;
        
        const rolesApi = {roles: roles, project_id: parseInt(requestParam.id || requestParam.project_id || requestQuery.project_id || requestBody.project_id)};
        console.log(rolesApi);
        const roles_user = request.user.role_project.filter(item => item.project_id === rolesApi.project_id).map(item1 => item1.role_id);
        
        const result = rolesApi.roles.some(item2 => roles_user.includes(item2));
        return result;
    }
}