import { UserService } from './../user/user.service';
import { ProjectService } from 'src/project/project.service';
import { response, sendError, sendSuccess } from 'src/commons/response';
import { TeamProject } from './../models/teamproject.model';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class TeamprojectService {
    constructor(
        @Inject('TEAMPROJECT_REPOSITORY')
        private readonly teamProjectRepository: typeof TeamProject,
        // private readonly projectService: ProjectService,
        // private readonly userService: UserService
    ) {}

    async addTeamProject(member: any): Promise<ResponseModel> {
        // const foundProject = await this.projectService.findProject(member.project_id);
        // if (!foundProject) {
        //     return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        // }

        // const foundUser = await this.userService.findUser(member.user_id);
        // if (!foundUser) {
        //     return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_NOT_FOUND});
        // }

        const user = await this.teamProjectRepository.findOne({
            where: {
                project_id: member.project_id,
                user_id: member.user_id
            }
        })
        if (user) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.TEAM_MEMBER_FOUND})
        }
        
        const addTeamProject = await this.teamProjectRepository.create(member);

        return sendSuccess({data: addTeamProject});
    }

    async deleteTeamProject(projectId: number, userId: number): Promise<ResponseModel> {
        // const foundProject = await this.projectService.findProject(projectId);
        // if (!foundProject) {
        //     return sendError(HttpStatus.BAD_REQUEST, response.PROJECT_NOT_FOUND);
        // }

        // const foundUser = await this.userService.findUser(userId);
        // if (!foundUser) {
        //     return sendError(HttpStatus.BAD_REQUEST, response.USER_NOT_FOUND);
        // }

        const user = await this.teamProjectRepository.findOne({
            where: {
                project_id: projectId,
                user_id: userId
            }
        })
        if (!user) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_NOT_FOUND})
        }
        await user.destroy();
        
        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_USER_SUCCESS});
    }
}
